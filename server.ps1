Install-Module -Name Pode -MaximumVersion 2.99.99
Import-Module -Name Pode -MaximumVersion 2.99.99

if (Test-Path "/ctt_values.json") {
  $values = Get-Content -Path "/values.json"
}
else {
  $values = (new-object Net.WebClient).DownloadString("https://raw.githubusercontent.com/ChrisTitusTech/winutil/main/MainWindow.xaml")
}
$values = $values | ConvertTo-Json -AsHashtable

Start-PodeServer {
  Add-PodeEndpoint -Address localhost -Port 8080 -Protocol Http

  Add-PodeRoute -Method Get -Path '/' -ScriptBlock {
    Write-PodeViewResponse -Path 'index'
  }
  Add-PodeRoute -Method Get -Path '/api/json/default' -ContentType 'application/json' -ScriptBlock {
    Write-PodeJsonResponse -Value $values
  }
}