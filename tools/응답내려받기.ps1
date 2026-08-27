# 패스루 응답을 내 컴퓨터 엑셀 파일로 내려받기
# 사용법: 우클릭 → PowerShell로 실행 (EXEC_URL은 배포 후 Claude가 채워줌)
$EXEC_URL = "https://script.google.com/macros/s/AKfycbwoyzmVfie8_saD6ral1Sfgftuq6kz2DbaeORwMgx3YJZQBMkhshu7117tucOJ3ENQ/exec"
$KEY = "passthru-2026"
$out = "$HOME\Desktop\패스루_응답_$(Get-Date -Format 'MMdd_HHmm').csv"
Invoke-WebRequest -Uri "$EXEC_URL?key=$KEY" -OutFile $out
Write-Host "저장됨: $out (엑셀에서 바로 열립니다)"
Start-Process $out
