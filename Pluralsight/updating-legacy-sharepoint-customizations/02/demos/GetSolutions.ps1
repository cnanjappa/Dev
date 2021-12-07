# Load the SharePoint snap-in
Add-PSSnapIn Microsoft.SharePoint.PowerShell -ea SilentlyContinue

# Provide the value below for a single site collection in your environment
$siteUrl = "Enter your site URL here"

# Get all sandboxed solutions deployed to this site
Get-SPUserSolution -Site $siteUrl

# Get all sandboxed solutions in all site collections
Get-SPSite | ForEach-Object { Get-SPUserSolution -Site $_ }

# Get all farm solutions
Get-SPSolution

# Provide the values below for your environment
$farmsolutionName = "Enter your farm solution name here"
$localFilePath = "Enter your local file path here"

# Download a specific farm solution to the local file system
$farm = Get-SPFarm
$file = $farm.Solutions.Item($solutionName).SolutionFile
$file.SaveAs($localFilePath)