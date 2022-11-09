<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Youtube Index Image Downloader</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
        <header>Download Thumbnail</header>
        <div class="url-input">
            <span class="title">Paste video url:</span>
            <div class="field">
                <input type="text" placeholder="https://www.youtube.com/watch?v=SE_8DxZLmLk" required>
                <input type="hidden" class="hidden-input">
                <div class="bottom-line"></div>
            </div>
        </div>
        <div class="preview-area">
            <img src="img.jpg" alt="thumbnail" class="thumbnail">
            <i class="icon fa-solid fa-cloud-arrow-down"></i>
            <span>Paste video url to see preview</span>
        </div>
        <button class="download-btn" type="submit">Download Thumbnail</button>
    </form>


    <script src="scripts.js"></script>
</body>

</html>

<?php
if (isset($_POST['download'])) { //Ha a download btn-re kattintok:
    $imgUrl = $_POST['imgurl']; //img url megkapása a  'hidden input' -ból
    $ch = curl_init($imgUrl); //curl inicializálása
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $download = curl_exec($ch); //letöltés végrehajtása
    curl_close($ch); //curl session bezárása
    header('Content-type: image/jpg'); //file típus beállítása jpg-re
    header('Content-Disposition: attachment; filename="thumbnail.jpg"');
    echo $download; //letöltés jpg formátumba
}
?>