# Photoshop Watermark Automation Script

This script automates the process of adding a date-based watermark to images using Adobe Photoshop. It processes a batch of images from a selected input folder, adds a formatted date watermark extracted from the image metadata, and saves the watermarked images in a specified output folder.

## Features
- **Batch Processing**: Processes multiple image files in a selected folder.
- **Metadata Extraction**: Retrieves the creation date from the image's metadata and uses it as the watermark text.
- **Customizable Watermark**: Adds bolded black text with a white overlay for enhanced readability.
- **Flexible Placement**: Automatically positions the watermark in the bottom-right corner of the image.
- **Multi-format Support**: Compatible with common image formats including `.jpg`, `.jpeg`, `.png`, `.tif`, `.tiff`, and `.psd`.

## Prerequisites
- Adobe Photoshop installed.
- Basic knowledge of how to run Photoshop scripts.

## How to Use

### Step 1: Set Up the Script
1. Copy the script file to a known location on your computer.
2. Open Adobe Photoshop.

### Step 2: Run the Script
1. In Photoshop, go to **File > Scripts > Browse**.
2. Locate and select the script file.

### Step 3: Select Folders
- **Input Folder**: Choose the folder containing the images to be watermarked.
- **Output Folder**: Choose the folder where the watermarked images will be saved.

### Step 4: Let the Script Run
The script will:
1. Open each image from the input folder.
2. Add a date-based watermark in the bottom-right corner.
3. Save the watermarked image as a high-quality JPEG in the output folder.

### Output
- Watermarked images will be saved with their original filenames in the selected output folder.

## Notes
- Images without metadata creation dates will be skipped without alerting the user (this can be customized).
- The script positions the watermark differently for vertical and horizontal images to ensure readability.

## Example Watermark
The watermark format: `DD.MM.YYYY` (e.g., `29.12.2024`).

## Supported Formats
- `.jpg`
- `.jpeg`
- `.png`
- `.tif`
- `.tiff`
- `.psd`

## Code Highlights
1. **Date Formatting**:
   ```javascript
   function formatDate(dateStr) {
       var year = dateStr.substring(0, 4);
       var month = dateStr.substring(4, 6);
       var day = dateStr.substring(6, 8);
       return day + '.' + month + '.' + year;
   }
