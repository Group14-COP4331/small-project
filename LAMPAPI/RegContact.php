<?php
	$inData = getRequestInfo();
    $Name = $inData["Name"];
	$ContactPhoto = $inData["ContactPhoto"];
	$UserID = $inData["UserID"];
	$Email = $inData["Email"];
	$PhoneNumber = $inData["PhoneNumber"];
	$Address =  $inData["Address"];
	$Relationship =  $inData["Relationship"];
	$Notes =  $inData["Notes"];
	$conn = new mysqli("localhost", "TheBeast", "UCFGROUP14ROCKS", "FINAL");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (UserID, Name, ContactPhoto, 
								 Email, PhoneNumber, Address, Relationship, Notes)
								VALUES(?,?,?,?,?,?,?,?);");
		$stmt->bind_param("isssssss", $UserID, $Name, $ContactPhoto, $Email, 
						  $PhoneNumber, $Address, $Relationship, $Notes);
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