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

        if (isset($_GET['mediaID'])) { // if editing entry media description
            $editSuccess = "Media description successfully edited!";
            $id = $_GET['mediaID'];

            // prepare to fetch info of media with this id
            $stmt = $db->prepare("select * from Media where mediaID = ?");

            // fetch info of artifact with this id
            $stmt->execute([$id]);
            $tuple = $stmt->fetch(PDO::FETCH_ASSOC);

            // prepare to update media info
            $qry = $db->prepare('UPDATE Media SET mediaID = ?, mediaType = ?, location = ?, description = ?, entryID = ? WHERE mediaID = ?');
            $qry->bindParam(1, $mediaID);
            $qry->bindParam(2, $mediaType);
            $qry->bindParam(3, $location);
            $qry->bindParam(4, $description);
            $qry->bindParam(5, $entryID);
            $qry->bindParam(6, $mediaID);

            // set values of input fields
            $mediaID = $id;
            $mediaType = $tuple['mediaType'];
            $location = $tuple['location'];
            if (!strlen(trim($_POST['mediaDescription']))){ // if no description for media
                $description = NULL;
            }
            else{
                $description = $_POST['mediaDescription'];
            }
            $entryID = $tuple['entryID'];

            // update media info
            $qry->execute();

            // set success message
            $_SESSION['success'] = $editSuccess;

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
        else if (!isset($_GET['mediaID'])) { // if editing entry info

            $editSuccess;
            if ($_GET['type'] == 'artifact'){
                $editSuccess = "Artifact info successfully edited!";
            }
            else if ($_GET['type'] == 'plant'){
                $editSuccess = "Plant info successfully edited!";
            }

            // prepare to update entry info
            $qry = $db->prepare('UPDATE Entry SET entryID = ?, entryName = ?, entryDescription = ?, entryType= ? WHERE entryID = ?');
            $qry->bindParam(1, $entryID);
            $qry->bindParam(2, $entryName);
            $qry->bindParam(3, $entryDescription);
            $qry->bindParam(4, $entryType);
            $qry->bindParam(5, $entryID);

            // set values of input fields
            $entryID = $_GET['ID'];
            $entryName = $_POST['entryName'];
            if (!strlen(trim($_POST['entryDescription']))){ // if no description for artifact
                $entryDescription = NULL;
            }
            else{
                $entryDescription = $_POST['entryDescription'];
            }
            $entryType = $_GET['type'];

            // update artifact info
            $qry->execute();

            // set success message
            $_SESSION['editSuccess'] = $editSuccess;

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
