<?php

    header('Access-Control-Allow-Origin: http://connectere.online/'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

	$inData = getRequestInfo();
	$DateCreated = date('Y-m-d H:i:s');
	$DateLastLoggedIn = date('Y-m-d H:i:s');
    $Name = $inData["Name"];
    $Login = $inData["Login"];
    $Password = $inData["Password"];
	$Contactphoto = $inData["Contactphoto"];
	$conn = new mysqli("localhost", "TheBeast", "UCFGROUP14ROCKS", "FINAL");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Users (DateCreated, DateLastLoggedIn, 
								Name, Login, Password, ContactPhoto)
								VALUES(?,?,?,?,?,?);");
		$stmt->bind_param("ssssss", $DateCreated, $DateLastLoggedIn,
							$Name, $Login, $Password, $Contactphoto);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>