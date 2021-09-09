<?php
	$inData = getRequestInfo();
	$userID = $inData["UserID"];
	$name = $inData["Name"];
    $logIn = $inData["LogIn"];
    $contactPhoto = $inData["ContactPhoto"];
	$conn = new mysqli("localhost", "TheBeast", "UCFGROUP14ROCKS", "FINAL");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Users SET Name = ?, Login = ?, ContactPhoto = ? WHERE ID = ?");
		$stmt->bind_param("sssi", $name, $logIn, $contactPhoto, $userID);
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
