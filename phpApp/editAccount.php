<?php
session_start();
?>

<!DOCTYPE html>
<html>
<body>
<?php
    
    $editSuccess = "Profile info successfully updated!";

    // path to the SQLite database file
    $db_file = './museum.db';

    try {
        // open connection to the airport database file
        $db = new PDO('sqlite:' . $db_file);

        // set errormode to use exceptions
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // prepare to update profile info
        $qry = $db->prepare('UPDATE user SET username = ?, password = ? WHERE userID = 1');
        $qry->bindParam(1, $username);
        $qry->bindParam(2, $password);

        // set values of input fields
        $username = $_POST['username'];
        $password = $_POST['password'];

        // update food item info
        $qry->execute();

        // set success message
        $_SESSION['success'] = $editSuccess;

        // disconnect from db
        $db = null;

        // redirect to editProfilePage.php
        header("Location: account.php");

        exit();
    }
    catch(PDOException $e) {
        die('Exception : '.$e->getMessage());
    }
?>

</body>
</html>