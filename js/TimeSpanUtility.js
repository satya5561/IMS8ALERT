/* This reusable script is copyrighted.
   Copyright (c) 2004,2005,2006 Claude Ostyn
This script is free for use with attribution
under the Creative Commons Attribution-ShareAlike 2.5 License.
To view a copy of this license, visit
http://creativecommons.org/licenses/by-sa/2.5/
or send a letter to
Creative Commons, 559 Nathan Abbott Way, Stanford, California 94305, USA.

For any other use, contact Claude Ostyn via tools@Ostyn.com.


*/

function centisecsToISODuration(n, bPrecise) {

    var str = "P";
    var nCs = n;
    var nY = 0, nM = 0, nD = 0, nH = 0, nMin = 0, nS = 0;
    n = Math.max(n, 0);
    var nCs = n;
    with (Math) {
        nCs = round(nCs);
        if (bPrecise == true) {
            nD = floor(nCs / 8640000);
        }
        else {
            nY = floor(nCs / 3155760000);
            nCs -= nY * 3155760000;
            nM = floor(nCs / 262980000);
            nCs -= nM * 262980000;
            nD = floor(nCs / 8640000);
        }
        nCs -= nD * 8640000;
        nH = floor(nCs / 360000);
        nCs -= nH * 360000;
        var nMin = floor(nCs / 6000);
        nCs -= nMin * 6000
    }

    if (nY > 0) str += nY + "Y";
    if (nM > 0) str += nM + "M";
    if (nD > 0) str += nD + "D";
    if ((nH > 0) || (nMin > 0) || (nCs > 0)) {
        str += "T";
        if (nH > 0) str += nH + "H";
        if (nMin > 0) str += nMin + "M";
        if (nCs > 0) str += (nCs / 100) + "S";
    }
    if (str == "P") str = "PT0H0M0S";

    return str;
}


function ISODurationToCentisec(str) {

    var aV = new Array(0, 0, 0, 0, 0, 0);
    var bErr = false;
    var bTFound = false;
    if (str.indexOf("P") != 0) bErr = true;
    if (!bErr) {
        var aT = new Array("Y", "M", "D", "H", "M", "S")
        var p = 0, i = 0;
        str = str.substr(1);
        for (i = 0 ; i < aT.length; i++) {
            if (str.indexOf("T") == 0) {
                str = str.substr(1);
                i = Math.max(i, 3);
                bTFound = true;
            }
            p = str.indexOf(aT[i]);
            //alert("Checking for " + aT[i] + "\nstr = " + str);
            if (p > -1) {

                if ((i == 1) && (str.indexOf("T") > -1) && (str.indexOf("T") < p)) continue;
                if (aT[i] == "S") {
                    aV[i] = parseFloat(str.substr(0, p))
                }
                else {
                    aV[i] = parseInt(str.substr(0, p))
                }
                if (isNaN(aV[i])) {
                    bErr = true;
                    break;
                }
                else if ((i > 2) && (!bTFound)) {
                    bErr = true;
                    break;
                }
                str = str.substr(p + 1);
            }
        }
        if ((!bErr) && (str.length != 0)) bErr = true;

    }
    if (bErr) {

        return
    }
    return aV[0] * 3155760000 + aV[1] * 262980000
      + aV[2] * 8640000 + aV[3] * 360000 + aV[4] * 6000
      + Math.round(aV[5] * 100)
}


function SCORM12DurationToCs(str) {
    var a = str.split(":");
    var nS = 0, n = 0;
    var nMult = 1;
    var bErr = ((a.length < 2) || (a.length > 3));
    if (!bErr) {
        for (i = a.length - 1; i >= 0; i--) {
            n = parseFloat(a[i]);
            if (isNaN(n)) {
                bErr = true;
                break;
            }
            nS += n * nMult;
            nMult *= 60;
        }
    }
    if (bErr) {
        //alert("Incorrect format: " + str + "\n\nFormat must be [HH]HH:MM:SS[.SS]");
        return NaN;
    }
    return Math.round(nS * 100);
}

function centisecsToSCORM12Duration(n) {

    var bTruncated = false;
    with (Math) {
        n = round(n);
        var nH = floor(n / 360000);
        var nCs = n - nH * 360000;
        var nM = floor(nCs / 6000);
        nCs = nCs - nM * 6000;
        var nS = floor(nCs / 100);
        nCs = nCs - nS * 100;
    }
    if (nH > 9999) {
        nH = 9999;
        bTruncated = true;
    }
    var str = "0000" + nH + ":";
    str = str.substr(str.length - 5, 5);
    if (nM < 10) str += "0";
    str += nM + ":";
    if (nS < 10) str += "0";
    str += nS;
    if (nCs > 0) {
        str += ".";
        if (nCs < 10) str += "0";
        str += nCs;
    }

    return str;
}



function MakeISOtimeStamp(objSrcDate, bRelative, nResolution) {

    var s = "";
    var nY = 0, nM = 0, nD = 0, nH = 0, nMin = 0, nS = 0, nMs = 0, nCs = 0;
    var bCentisecs = ((isNaN(nResolution)) || (nResolution != 0));

    objDate = new Date();
    with (objDate) {
        setTime(objSrcDate.getTime());
        ((bRelative) ? nMs = getMilliseconds() : nMs = getUTCMilliseconds());

        if (bCentisecs) {

            if (nMs > 994) {
                ((bRelative) ? setMilliseconds(1000) : setUTCMilliseconds(1000));
            }
            else {
                nCs = Math.floor(nMs / 10);
            }
        }
        else {

            if (nMs > 499) {
                ((bRelative) ? setMilliseconds(1000) : setUTCMilliseconds(1000));
            }
        }
        if (bRelative) {
            nY = getFullYear();
            nM = getMonth();
            nD = getDate();
            nH = getHours();
            nMin = getMinutes();
            nS = getSeconds();
        }
        else {
            nY = getUTCFullYear();
            nM = getUTCMonth();
            nD = getUTCDate();
            nH = getUTCHours();
            nMin = getUTCMinutes();
            nS = getUTCSeconds();
        }
    }

    s = nY + "-" +
      ZeroPad(nM + 1, 2) + "-" +
      ZeroPad(nD, 2) + "T" +
      ZeroPad(nH, 2) + ":" +
      ZeroPad(nMin, 2) + ":" +
      ZeroPad(nS, 2);
    if (nCs > 0) {
        s += "." + ZeroPad(nCs, 2);
    }
    if (bRelative) {

        var nTZOff = -objDate.getTimezoneOffset();
        if (nTZOff >= 0) s += "+";
        s += ZeroPad(Math.round(nTZOff / 60), 2);
        nTZOff = nTZOff % 60;
        if (nTZOff > 0) s += ":" + ZeroPad(nTZOff, 2);
    }
    else {
        s += "Z";
    }
    return s;
}

function ZeroPad(n, nLength) {

    var bNeg = (n < 0);
    var s = n.toString();
    if (bNeg) s = s.substr(1, s.length);
    while (s.length < nLength) s = "0" + s;
    if (bNeg) s = "-" + s;
    return s
}

function trim(s) {
    if (s == null) return "";
    return s.replace(/^\s*(\b.*\b|)\s*$/, "$1");
}

var gsParseErr = "";

function DateFromISOString(strDate) {

    var sDate = strDate;
    var sTime = null;
    var sTimeOffset = null;
    var sUTCOffsetSign = "";
    var a = null;
    var n = 0, nY = 0, nM = 0, nD = 1, nH = 0, nMin = 0, nS = 0, nMs = 0;

    gsParseErr = "";


    var bZulu = (sDate.indexOf("Z") > -1);
    if (bZulu) sDate = sDate.substr(0, sDate.length - 1);


    if (sDate.indexOf("T") > -1) {
        var a = sDate.split("T");
        sDate = a[0];
        var sTime = a[1];
    }

    a = sDate.split("-");
    nY = parseInt(a[0], 10);
    if ((isNaN(nY)) || (nY > 9999) || (nY < 0000)) {
        gsParseErr = "Invalid year value:\n" + strDate;
        return null;
    }
    if (a.length > 1) {
        nM = parseInt(a[1], 10) - 1;
        if (nM < 0) alert("a[1] =" + a[1] + " from " + strDate);
        if (a.length > 2) {
            nD = parseInt(a[2], 10);
        }
    }

    if (sTime) {
        if (sTime.indexOf("-") > -1) sUTCOffsetSign = "-";
        if (sTime.indexOf("+") > -1) sUTCOffsetSign = "+";
        if (sUTCOffsetSign != "") {
            if (bZulu) {
                gsParseErr = "You can't have both UTC offset and Zulu in ISO time stamp:\n" + strDate;
                return null;
            }
            a = sTime.split(sUTCOffsetSign);
            sTime = a[0];
            sTimeOffset = a[1];
        }
        a = sTime.split(":");
        nH = parseInt(a[0], 10);
        if (a.length > 1) {
            nMin = parseInt(a[1], 10);
            if (a.length > 2) {
                (a[2].indexOf(".") < 0 ? nS = parseInt(a[2], 10) : nS = parseFloat(a[2]));
                if (isNaN(nS)) {
                    gsParseErr = "Error parsing seconds: " + a[2] + "\n" + strDate;
                    return null;
                }
                nMs = Math.round((nS % 1) * 1000);
                nS = Math.floor(nS);
            }
        }
    }
    else if (bZulu) {
        gsParseErr = "UTC not allowed in time stamp unless there is a Time part:\n" +
          strDate;
        return null;
    }
    var objDate = new Date();
    if (bZulu) {
        objDate.setUTCFullYear(nY, nM, nD);
        objDate.setUTCHours(nH, nMin, nS, nMs);
    }
    else {

        if (sTimeOffset) {
            var nOffset = 0;
            a = sTimeOffset.split(":");
            nOffset = parseInt(a[0]);
            if (isNaN(nOffset)) {
                gsParseErr = "Found UTC time offset but offset value is NaN:\n" + strDate;
                return null;
            }
            nOffset = nOffset * 60
            if (a.length > 1) {
                n = parseInt(a[1]);
                if (isNaN(n)) {
                    gsParseErr = "Found UTC time offset minutes but minute value is NaN:\n" +
                      strDate;
                    return null;
                }
                nOffset += n;
            }
            nOffset = nOffset * 60;
            if (sUTCOffsetSign == "-") nOffset = -nOffset;
            objDate.setTime(objDate.getTime() + nOffset);
        }
        objDate.setFullYear(nY, nM, nD);
        objDate.setHours(nH, nMin, nS, nMs);
    }
    return objDate
}

/* Helper Method to convert TimeSpan to JSON and JSON to TimeSpan string END*/