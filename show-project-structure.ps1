# Define the project root directory (current directory where you run the script)
$projectRoot = (Get-Location).Path

# Get all items (files and folders) recursively, excluding node_modules and dist
Get-ChildItem -Path $projectRoot -Recurse -Force | Where-Object {
    # Ensure the path doesn't contain '\node_modules\' or '\dist\' (case-insensitive for robustness)
    ($_.FullName -notlike "*\node_modules\*" -and $_.FullName -notlike "*\dist\*")
} | ForEach-Object {
    # Calculate the relative path for display by removing the project root path
    $relativePath = $_.FullName.Substring($projectRoot.Length)
    if ($relativePath.StartsWith("\")) {
        $relativePath = $relativePath.Substring(1) # Remove leading backslash if present
    }

    # Indent based on depth for better visualization
    # The depth is the number of backslashes in the relative path
    $depth = ($relativePath | Select-String -Pattern '\\').Matches.Count
    $indent = "  " * $depth

    if ($_.PSIsContainer) {
        # If it's a folder, print its name followed by a backslash and in cyan color
        Write-Host "$indent$($_.Name)\" -ForegroundColor Cyan
    }
    else {
        # If it's a file, print its name
        Write-Host "$indent$($_.Name)"
    }
}