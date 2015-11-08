
// assign namespace for convenience
var nservice = window.webapis.nservice || {},
	Main = {},
	gWidgetAPI,
	gTVKey,
	gnNserviceDeviceID = -1,    // Device id
	gsDevName = "",
	gsInputMsg = "no input yet";


Main.onLoad = function () {
	alert("[Nservice Tutorial]: Tutorial_onLoad()");

	var saDevInfo = null,
	nDevNum = 0,
	i = 0;

	gWidgetAPI = new Common.API.Widget();    // create Common module
	gTVKey = new Common.API.TVKeyValue();
	gWidgetAPI.sendReadyEvent();             // send ready message to Application Manager

	// register nservice manager callback to receive device connect and disconnect events
	nservice.registerManagerCallback(Main.onDeviceStatusChange);

	// initialize nservice device profile and get available devices
	nservice.getNServiceDevices(Main.onCustomObtained);
}



Main.onUnload = function()
{
	widgetAPI.sendExitEvent(); 
}



Main.onDeviceStatusChange = function (sParam) {
    alert("#### onDeviceStatusChange - Device status change recieved ####");
    alert("#### onDeviceStatusChange - event type is " + sParam.eventType + " ####");
    alert("#### onDeviceStatusChange - event device name is " + sParam.deviceName + " ####");
    alert("#### onDeviceStatusChange - event device type is " + sParam.deviceType + " ####");

    switch (Number(sParam.eventType)) {
        case nservice.MGR_EVENT_DEV_CONNECT:
            alert("#### onDeviceStatusChange - MGR_EVENT_DEV_CONNECT ####");
            if (sParam.deviceType == nservice.DEV_SMART_DEVICE) {
                document.getElementById('txtCS').innerHTML = "Connected NService: " + sParam.deviceName;
            }
            break;

        case nservice.MGR_EVENT_DEV_DISCONNECT:
            alert("#### onDeviceStatusChange - MGR_EVENT_DEV_DISCONNECT ####");
            break;

        default:
            alert("#### onDeviceStatusChange - Unknown event ####");
            break;

    }
    nservice.getNServiceDevices(Main.onNserviceObtained);
}


// Main.onNserviceObtained Called by getNServiceDevices in Main.onDeviceStatusChange
// callback function when a device is connected or disconnected.

Main.onNserviceObtained = function (nservices) {
    if (nservices.length > 0) {
        alert("#### onNserviceObtained - found " + nservices.length + " nservice device(s) ####");
        if (nservices[0]!= null && nservices[0].getType() == nservice.DEV_SMART_DEVICE) {
            alert("#### onNserviceObtained - get device instance ####");
            nservicedeviceInstance = nservices[0];

            nservicedeviceInstance.registerDeviceCallback(Main.onDeviceEvent);
        }
    } else {
        alert("#### onNserviceObtained - no nservice device found ####");
    }
}

// Main.onDeviceEvent is called when device instance event arrive.
// Example displays event type on console
// and on message arrival performs other functions provided by NService interface.

Main.onDeviceEvent = function (sParam) {
    switch (Number(sParam.eventType)) {
        case nservice.DEV_EVENT_MESSAGE_RECEIVED:
            alert("#### onDeviceEvent - DEV_EVENT_MESSAGE_RECEIVED ####");
            Main.onMessageReceived(sParam.eventData.message, sParam.eventData.context);
            break;
        case nservice.DEV_EVENT_JOINED_GROUP:
            alert("#### onDeviceEvent - DEV_EVENT_JOINED_GROUP ####");
            break;
        case nservice.DEV_EVENT_LEFT_GROUP:
            alert("#### onDeviceEvent - DEV_EVENT_LEFT_GROUP ####");
            break;
        default:
            alert("#### onDeviceEvent - Unknown event ####");
            break;
    }
}


Main.onMessageReceived = function (message, context) {
    // message -> message body
    // context -> message context (headers and etc)
    alert("#### onMessageReceived:" + message);

}