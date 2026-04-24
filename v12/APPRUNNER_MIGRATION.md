# Vercel → GitHub Enterprise + AWS App Runner 이관 가이드

## 아키텍처 변경 요약

```
[기존]
로컬 PowerShell → prepare_deploy.py → vercel CLI → Vercel CDN

[이관 후]
로컬 PowerShell → prepare_deploy.py → git push → GitHub Enterprise
                                                        ↓ (push 이벤트)
                                              GitHub Actions
                                                        ↓
                                              Amazon ECR (컨테이너 이미지)
                                                        ↓
                                              AWS App Runner (자동 배포)
```

---

## 1단계: AWS 사전 준비

### 1-1. ECR 리포지터리 생성
```bash
aws ecr create-repository \
  --repository-name cosmax-dashboard \
  --region ap-northeast-2 \
  --image-scanning-configuration scanOnPush=true
```

### 1-2. App Runner 서비스 생성 (ECR 소스)
1. AWS 콘솔 → App Runner → 서비스 생성
2. **소스**: Amazon ECR
3. **ECR URI**: `<계정ID>.dkr.ecr.ap-northeast-2.amazonaws.com/cosmax-dashboard:latest`
4. **배포 트리거**: 수동 (GitHub Actions에서 start-deployment API 호출)
5. **포트**: `8080` (Dockerfile의 EXPOSE 값과 동일)
6. **헬스체크 경로**: `/health`
7. **CPU**: 0.25 vCPU / **메모리**: 0.5 GB (정적 파일 서버이므로 최소 사양)
8. 서비스 생성 후 **서비스 ARN** 복사해 두기

### 1-3. IAM 사용자 생성 (GitHub Actions용)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "arn:aws:ecr:ap-northeast-2:<계정ID>:repository/cosmax-dashboard"
    },
    {
      "Effect": "Allow",
      "Action": "ecr:GetAuthorizationToken",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "apprunner:StartDeployment",
      "Resource": "<App Runner 서비스 ARN>"
    }
  ]
}
```

---

## 2단계: GitHub Enterprise 설정

### 2-1. Secrets 등록
GitHub Enterprise 리포지터리 → Settings → Secrets and variables → Actions

| Secret 이름 | 값 |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM 사용자 액세스 키 |
| `AWS_SECRET_ACCESS_KEY` | IAM 사용자 시크릿 키 |
| `APPRUNNER_SERVICE_ARN` | App Runner 서비스 ARN |

### 2-2. 파일 구조 확인
```
/
├── .github/
│   └── workflows/
│       └── deploy-apprunner.yml   ← 이미 생성됨
└── v12/
    └── deploy/
        ├── index.html
        ├── data.json
        ├── articles.json
        ├── Dockerfile             ← 이미 생성됨
        └── nginx.conf             ← 이미 생성됨
```

### 2-3. .gitignore 업데이트 필요
현재 `.gitignore`가 모든 파일을 제외(`*`)하므로, 새 파일들을 추가해야 합니다:

```
# .gitignore에 추가
!.github/
!.github/workflows/
!.github/workflows/deploy-apprunner.yml
!v12/deploy/Dockerfile
!v12/deploy/nginx.conf
```

---

## 3단계: 데이터 업데이트 → 배포 흐름

### 기존 Vercel 방식
```bash
bash v12/deploy.sh   # Vercel CLI로 직접 배포
```

### 이관 후 App Runner 방식
```bash
# 1. 데이터 업데이트 (기존과 동일)
python v12/update_v12.py
python v12/update_kpi_v12.py
python v12/prepare_deploy.py

# 2. git 커밋 + 푸시 (→ GitHub Actions 자동 실행)
git add v12/deploy/index.html v12/deploy/data.json v12/deploy/articles.json
git commit -m "데이터 업데이트 $(date +%Y-%m-%d)"
git push origin main
```
→ GitHub Actions가 자동으로 Docker 이미지 빌드 → ECR 푸시 → App Runner 배포

### PowerShell 스크립트 (Update-Dashboard.ps1) 수정 포인트
```powershell
# 기존 마지막 라인 (Vercel 배포):
# bash v12/deploy.sh

# 변경 후 (git push로 대체):
git -C $dashboardPath add v12/deploy/index.html v12/deploy/data.json v12/deploy/articles.json
git -C $dashboardPath commit -m "데이터 업데이트 $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git -C $dashboardPath push origin main
```

---

## 4단계: 로컬 테스트 (Docker)

배포 전 로컬에서 컨테이너 동작 확인:
```bash
cd v12/deploy

# 빌드
docker build -t cosmax-dashboard-test .

# 실행
docker run -p 8080:8080 cosmax-dashboard-test

# 브라우저에서 확인
open http://localhost:8080
```

---

## 비용 비교

| 항목 | Vercel (기존) | App Runner (이관) |
|---|---|---|
| 정적 호스팅 | 무료 플랜 | ECR + App Runner 비용 |
| App Runner 최소 사양 | - | ~$6/월 (0.25 vCPU, 최소 인스턴스 1) |
| ECR 스토리지 | - | ~$0.10/GB/월 |
| **비고** | 외부 서비스 | 사내 AWS 계정 |

> App Runner는 요청이 없을 때 자동으로 인스턴스를 0으로 줄이는 **자동 스케일링** 설정 가능.  
> 대시보드 특성상 트래픽이 적으므로 최소 인스턴스를 0으로 설정하면 비용 절감 가능.  
> (단, 첫 접근 시 콜드 스타트 10~20초 발생)
