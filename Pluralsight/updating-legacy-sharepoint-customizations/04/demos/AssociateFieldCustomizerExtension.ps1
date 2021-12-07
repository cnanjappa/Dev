# If PnP-PowerShell is not already installed, run the command below as an Administrator
# Install-Module SharePointPnPPowerShellOnline

Import-Module SharePointPnPPowerShellOnline

Connect-PnPOnline -Url https://[your-site].sharepoint.com/sites/CarvedRockFitness/ -Credentials (Get-Credential)
$targetList = Get-PnPList -Identity "Running"
$targetField = Get-PnPField -List $targetList -Identity "Miles"
$targetField.ClientSideComponentId = "4d6aaac4-62a7-421f-9ec1-59111ba63a21"
# Uncomment the line below to remove an existing Field Customizer Extension association
#$targetField.ClientSideComponentId = "00000000-0000-0000-0000-000000000000"
$targetField.Update()
Invoke-PnPQuery