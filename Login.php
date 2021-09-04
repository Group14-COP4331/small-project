
<?php

$inData = getRequestInfo();

$id = 0;
$name = "";
$photo = "";

$conn = new mysqli("localhost", "TheBeast", "UCFGROUP14ROCKS", "FINAL"); 	
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT ID,Name, ContactPhoto FROM Users WHERE Login=? AND Password =?");
    $stmt->bind_param("ss", $inData["Login"], $inData["Password"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if( $row = $result->fetch_assoc()  )
    {
        returnWithInfo( $row['Name'], $row['ID'], $row['ContactPhoto']);
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
    $retValue = '{"id":0,"Name":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $name, $id, $photo)
{
    $retValue = '{"id":' . $id . ',"Name":"' . $name . '", "photo":"' . $photo . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

?>
