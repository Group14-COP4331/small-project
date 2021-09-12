<?php
	$inData = getRequestInfo();
    $name = $inData["Name"];
    $phoneNumber = $inData["PhoneNumber"];
    $email = $inData["Email"];
    $address = $inData["Address"];
    $relationship = $inData["Relationship"];
    $notes = $inData["Notes"];
    $contactPhoto = $inData["ContactPhoto"];    
	$userID = $inData["UserID"];
	$id = $inData["ID"];

	$conn = new mysqli("localhost", "TheBeast", "UCFGROUP14ROCKS", "FINAL");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET Name = ?, PhoneNumber = ?, Email = ?, Address = ?, Relationship = ?, Notes = ?, ContactPhoto = ? WHERE UserID = ? AND ID = ?");
		$stmt->bind_param("sssssssii", $name, $phoneNumber, $email, $address, $relationship, $notes, $contactPhoto, $userID, $id);
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