
<?php

$inData = getRequestInfo();

$id = 0;
$firstName = "";
$lastName = "";
$photo = "";
$email = "";
$number = "";
$address = "";
$relationship = "";
$notes = "";


$conn = new mysqli("localhost", "TheBeast", "UCFGROUP14ROCKS", "FINAL"); 	
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT ID,firstName,lastName, ContactPhoto, Email, PhoneNumber, Address, Relationship, Notes FROM Contacts WHERE Firstname=? AND LastName=? AND UserID=?");
    $stmt->bind_param("ssi", $inData["FirstName"], $inData["LastName"], $inData["UserID"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if( $row = $result->fetch_assoc()  )
    {
        returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'], $row['ContactPhoto'], $row['Email'], $row['PhoneNumber'], $row['Address'], $row['Relationship'], $row['Notes']);
    }
    else
    {
        returnWithError("No Records Found");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError( $err )
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $firstName, $lastName, $id, $photo, $email, $number, $address, $relationship, $notes)
{
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '", "email":"'.$email.'", "number":"'.$number.'", "address":"'.$address.'", "relationship":"'.$relationship.'", "note":"'.$notes.'", "photo":"' . $photo . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

?>
