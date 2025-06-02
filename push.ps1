# push.ps1

# Prompt for commit message
$commitMessage = Read-Host "Enter commit message"

# Run Git commands
git add .
git commit -m "$commitMessage"
git push origin main

Write-Host ""
Write-Host "Push completed successfully." -ForegroundColor Green

# Keep window open
Read-Host -Prompt 'Press ENTER to exit'
