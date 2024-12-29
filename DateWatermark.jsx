// Select the folder with the original images
var inputFolder = Folder.selectDialog("Select the folder with images to watermark");
// Select the output folder where watermarked images will be saved
var outputFolder = Folder.selectDialog("Select the output folder for watermarked images");

// Ensure both folders are selected
if (inputFolder && outputFolder) {
    // Get all image files (jpg, jpeg, png, tif, tiff, psd) from the input folder
    var files = inputFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|psd)$/i);

    var white = new SolidColor();
    white.rgb.red = 255;
    white.rgb.green = 255;
    white.rgb.blue = 255;

    var black = new SolidColor();
    black.rgb.red = 0;
    black.rgb.green = 0;
    black.rgb.blue = 0;
    
    // Loop through each file
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var doc = open(file);  // Open the current image in Photoshop

        // Try to retrieve the creation date from metadata
        var date = String(doc.info.creationDate); 
        if (date) {
            /**
             * To make the date watermark the date is first being formatted.
             * After that the outer bolded black text is being formatted and added.
             * Finally, the normal (not bolded) white text is added.
             */
            var formattedDate = formatDate(date);

            // Create the watermark text layer
            var blackTextLayer = doc.artLayers.add();
            blackTextLayer.kind = LayerKind.TEXT;
            blackTextLayer.textItem.contents = formattedDate;
            
            // Set the text font
            blackTextLayer.textItem.font = "CourierNewPS-BoldMT";
            blackTextLayer.textItem.color = black;
            
            // Do the rest of the formating and color
            formatText(blackTextLayer);

            // Second text is placed above the first one
            var whiteTextLayer = doc.artLayers.add();
            whiteTextLayer.kind = LayerKind.TEXT;
            whiteTextLayer.textItem.contents = formattedDate;
            
            whiteTextLayer.textItem.font = "CourierNewPSMT";
            whiteTextLayer.textItem.color = white;

            formatText(whiteTextLayer);
        } else {
            // alert("Date metadata not found for: " + file.name);  // Optional alert if date is missing
        }

        // Save the modified image to the output folder as a JPEG
        var saveFile = new File(outputFolder + "/" + file.name);
        var saveOptions = new JPEGSaveOptions();
        saveOptions.quality = 12;  // Maximum quality
        doc.saveAs(saveFile, saveOptions, true);

        doc.close(SaveOptions.DONOTSAVECHANGES);  // Close without saving changes to the original file
    }
} else {
    alert("You must select both an input and an output folder to continue.");
}

function formatDate(dateStr) {
    // Extract year, month, and day from the string
    var year = dateStr.substring(0, 4); // First four characters for year
    var month = dateStr.substring(4, 6); // Next two characters for month
    var day = dateStr.substring(6, 8); // Last two characters for day
    
    // Return formatted date as "DD.MM.YYYY"
    return day + '.' + month + '.' + year; // Format as "DD.MM.YYYY"
}

function formatText(textLayer) {
    // Set the font size relative to the image size
    if (doc.width >= doc.height) {
        var fontSize = doc.height / 17;
    }
    else {
        var fontSize = doc.width / 17;
    }

    // var fontSize = doc.height / 17;
    textLayer.textItem.size = fontSize;
    
    // Align the text to the right
    textLayer.textItem.justification = Justification.CENTER;
    
    // Set the position in the bottom-right corner
    // Different positions for vertical and horizontal pictures
    if (doc.width >= doc.height) {
        textLayer.textItem.position = [
            doc.width * 0.8,
            doc.height * 0.92
        ];
    }
    else {
        textLayer.textItem.position = [
            doc.width * 0.7,
            doc.height * 0.92
        ];
    }
}
