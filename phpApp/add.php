<?php
session_start();
?>

<!DOCTYPE html>
<html>
<body>
<?php
    
    // path to the SQLite database file
    $db_file = './museum.db';

    try {
        // open connection to the museum database file
        $db = new PDO('sqlite:' . $db_file);

        // set errormode to use exceptions
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if (isset($_GET['artifactID'])) { // if adding media to entry
            $entryID = $_GET['artifactID'];
            $addSuccess = "Media successfully added!";
            $sizeError = "Exceeded file size limit";

            // check filesize
            if ($_FILES['mymedia']['error'] == 1 || $_FILES['mymedia']['error'] == 2){
                $_SESSION['error'] = $sizeError;
                header("Location: addMedia.php?ID=$entryID");
                exit();
            }
            
            // check file type
            $mediaType = $_POST['mediaType'];
            // find file extension
            $target_file = 'media/' . basename($_FILES["mymedia"]["name"]);
            $extension = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            if ($mediaType=='photo'){
                if ($extension != 'jpg' && $extension != 'jpeg' && $extension != 'png'){
                    $_SESSION['error'] = "Not a valid image file type";
                    header("Location: addMedia.php?ID=$entryID");
                    exit();
                }
            }
            if ($mediaType=='video'){
                if ($extension != 'mp4' && $extension != 'mov'){
                    $_SESSION['error'] = "Not a valid video file type";
                    header("Location: addMedia.php?ID=$entryID");
                    exit();
                }
            }
            if ($mediaType == 'audio'){
                if ($extension != 'mp3' && $extension != 'm4a' && $extension != 'wav'){
                    $_SESSION['error'] = "Not a valid audio file type";
                    header("Location: addMedia.php?ID=$entryID");
                    exit();
                }
            }

            // if no errors, prepare to insert new media info 
            $qry = $db->prepare('INSERT INTO Media (mediaID, mediaType, location, description, entryID) VALUES (?, ?, ?, ?, ?)');
            $qry->bindParam(1, $mediaID);
            $qry->bindParam(2, $mediaType);
            $qry->bindParam(3, $location);
            $qry->bindParam(4, $description);
            $qry->bindParam(5, $entryID);

            // find current max mediaID to find next available mediaID
            $result = $db->query("SELECT MAX(mediaID) AS max_mediaID FROM Media");
            $row = $result->fetch(PDO::FETCH_ASSOC);

            // fill in variables
            $mediaID = $row['max_mediaID'] + 1;
            $mediaType = $_POST['mediaType'];
            $path = realpath($_FILES["mymedia"]["tmp_name"]);
            $location ='media/'.$mediaID.'.'.$extension;
            copy($path, $location);
            $description = $_POST['mediaDescription'];
            $entryID = $_GET['artifactID'];

            // insert new info into media
            $qry->execute();

            // set success message
            $_SESSION['success'] = $addSuccess;

            // disconnect from db
            $db = null;

            // redirect to editArtifact.php
            header("Location: editArtifact.php?ID=$entryID");

            exit();
        }
        else if (!isset($_GET['artifactID'])) { // if adding new entry

            $addSuccess;
            if ($_GET['type'] == 'artifact'){
                $addSuccess = "Artifact successfully added!";
            }
            else if ($_GET['type'] == 'plant'){
                $addSuccess = "Plant successfully added!";
            }

            // create unique artifactID
            $usedID = true;
            $possibleID = 0;

            while($usedID){
                $possibleID = rand(1000, 2000);
                // prepare to fetch entry info
                $stmt = $db->prepare("SELECT * FROM Entry WHERE entryID = ?");
                // fetch info of entry with this ID (if exists)
                $stmt->execute([$possibleID]);
                $tuple = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!empty($tuple)){ // if entry with this ID already exists
                    $usedID = true;
                }
                else{ // if ID is available, exit loop
                    $usedID = false;
                }
            }

            // prepare to insert new info into Entry 
            $qry = $db->prepare('INSERT INTO Entry (entryID, entryName, entryDescription, entryType) VALUES (?, ?, ?, ?)');
            $qry->bindParam(1, $entryID);
            $qry->bindParam(2, $entryName);
            $qry->bindParam(3, $entryDescription);
            $qry->bindParam(4, $entryType);

            // set values of input fields
            $entryID = $possibleID;
            $entryName = $_POST['entryName'];
            if (!strlen(trim($_POST['entryDescription']))){ // if no description for entry
                $entryDescription = NULL;
            }
            else{
                $entryDescription = $_POST['entryDescription'];
            }
            $entryType = $_GET['type'];

            // insert new info into Entry
            $qry->execute();

            // set success message
            $_SESSION['addSuccess'] = $addSuccess;

            // disconnect from db
            $db = null;

            // redirect
            if ($_GET['type'] == 'artifact'){
                header("Location: editArtifact.php?ID=$entryID");
            }
            else if ($_GET['type'] == 'plant'){
                header("Location: editPlant.php?ID=$entryID");
            }

            exit();
        }
    }
    catch(PDOException $e) {
        die('Exception : '.$e->getMessage());
    }
?>

</body>
</html>
