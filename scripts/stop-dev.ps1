$connections = Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue

if (-not $connections) {
  Write-Host "No process is listening on port 4173."
  exit 0
}

$processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique

foreach ($processId in $processIds) {
  try {
    Stop-Process -Id $processId -Force -ErrorAction Stop
    Write-Host "Stopped process $processId on port 4173."
  } catch {
    Write-Host "Could not stop process ${processId}: $($_.Exception.Message)"
  }
}
