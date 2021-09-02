
<?php

$inData = getRequestInfo();

$id = 0;
$firstName = "";
$lastName = "";
$photo = "";

$conn = new mysqli("localhost", "TheBeast", "UCFGROUP14ROCKS", "FINAL"); 	
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT ID,firstName,lastName, ContactPhoto FROM Users WHERE Login=? AND Password =?");
    $stmt->bind_param("ss", $inData["Login"], $inData["Password"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if( $row = $result->fetch_assoc()  )
    {
        returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'], $row['ContactPhoto']);
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

function returnWithInfo( $firstName, $lastName, $id, $photo)
{
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '", "photo":"' . $photo . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

?>
