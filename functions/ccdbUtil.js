var CcdbUtil = {};

CcdbUtil.getSoundsPinyin = function(value) {
	var results = [];
	if (!value) {
		return results;
	}

	var splits = value.split(" ");
	for (var i in splits) {
		results.push(CcdbUtil.convertPinyin(splits[i]));
	}

	return results;
};
CcdbUtil.getTraditionalVariant = function(value) {
	var results = [];
	if (!value) {
		return results;
	}

	var splits = value.split(" ");
	for (var i in splits) {
		results.push(CcdbUtil.convertCode(splits[i]));
	}

	return results;
};

// Return a new string by replacing one character with supplied string
CcdbUtil.setCharAt = function(str, i, ch) {
    if (i < str.length) {
        return str.substr(0, i) + ch + str.substr(i + 1);
    }

    return str;
};


CcdbUtil.getDefinition = function(value) {
	var results = [];
	if (!value) {
		return results;
	}

	var splits = value.split(";");
	for (var i in splits) {
		results.push(splits[i]);
	}

	return results;
};

CcdbUtil.convertPinyin = function(value) {
    var split = CcdbUtil.splitSound(value);
    var result = split[0];
    var tone = split[1];
    if (tone < 1 || tone > 5) {
        return result;
    }

    return CcdbUtil.addDiacritic(result, tone);
};

// Split the given sound and its tone, if any
CcdbUtil.splitSound = function(value) {
    var result = "";
    if (value) {
        result = value.toLowerCase();
    }

    var tone = parseInt(value.substr(value.length - 1), 10);
    if (isNaN(tone)) {
        tone = 0;
    } else {
        result = result.substr(0, result.length - 1);
    }

    var iV = result.indexOf("v");
    if (iV >= 0) {
        result = CcdbUtil.setCharAt(result, iV, "\u00FC");
    }

    return [result, tone];
};

CcdbUtil.addDiacritic = function(value, tone) {
    if (value === "ng") {
        switch (tone) {
        case 2: value = CcdbUtil.setCharAt(value, 0, "\u0144"); break;
        case 3: value = CcdbUtil.setCharAt(value, 0, "\u0148"); break;
        case 4: value += "\u0300"; break;
        }

        return value;
    }

    if (value === "m") {
        switch (tone) {
        case 2: value += "\u0301"; break;
        case 4: value += "\u0300"; break;
        }

        return value;
    }

    var iA = value.lastIndexOf("a");  // for Yale
    var iO = value.indexOf("o");
    var iE = value.indexOf("e");
    var iI = value.indexOf("i");
    var iU = value.indexOf("u");
    var iV = value.indexOf("\u00FC");

    var iIU = value.indexOf("iu");
    if (iIU >= 0) {
        iI = -1;
        iU = iIU + 1;
    }

    if (iA >= 0) {
        switch (tone) {
        case 1: value = CcdbUtil.setCharAt(value, iA, "\u0101"); break;
        case 2: value = CcdbUtil.setCharAt(value, iA, "\u00E1"); break;
        case 3: value = CcdbUtil.setCharAt(value, iA, "\u01CE"); break;
        case 4: value = CcdbUtil.setCharAt(value, iA, "\u00E0"); break;
        }
    }
    else if (iO >= 0) {
        switch (tone) {
        case 1: value = CcdbUtil.setCharAt(value, iO, "\u014D"); break;
        case 2: value = CcdbUtil.setCharAt(value, iO, "\u00F3"); break;
        case 3: value = CcdbUtil.setCharAt(value, iO, "\u01D2"); break;
        case 4: value = CcdbUtil.setCharAt(value, iO, "\u00F2"); break;
        }
    }
    else if (iE >= 0) {
        switch (tone) {
        case 1: value = CcdbUtil.setCharAt(value, iE, "\u0113"); break;
        case 2: value = CcdbUtil.setCharAt(value, iE, "\u00E9"); break;
        case 3: value = CcdbUtil.setCharAt(value, iE, "\u011B"); break;
        case 4: value = CcdbUtil.setCharAt(value, iE, "\u00E8"); break;
        }
    }
    else if (iI >= 0) {
        switch (tone) {
        case 1: value = CcdbUtil.setCharAt(value, iI, "\u012B"); break;
        case 2: value = CcdbUtil.setCharAt(value, iI, "\u00ED"); break;
        case 3: value = CcdbUtil.setCharAt(value, iI, "\u01D0"); break;
        case 4: value = CcdbUtil.setCharAt(value, iI, "\u00EC"); break;
        }
    }
    else if (iU >= 0) {
        switch (tone) {
        case 1: value = CcdbUtil.setCharAt(value, iU, "\u016B"); break;
        case 2: value = CcdbUtil.setCharAt(value, iU, "\u00FA"); break;
        case 3: value = CcdbUtil.setCharAt(value, iU, "\u01D4"); break;
        case 4: value = CcdbUtil.setCharAt(value, iU, "\u00F9"); break;
        }
    }
    else if (iV >= 0) {
        switch (tone) {
        case 1: value = CcdbUtil.setCharAt(value, iV, "\u01D6"); break;
        case 2: value = CcdbUtil.setCharAt(value, iV, "\u01D8"); break;
        case 3: value = CcdbUtil.setCharAt(value, iV, "\u01DA"); break;
        case 4: value = CcdbUtil.setCharAt(value, iV, "\u01DC"); break;
        }
    }

    return value;
};


CcdbUtil.convertCode = function(value) {
    if (!value) {
        return [];
    }

    var splits = value.split("U+");
    if (splits.length < 2) {
        return [];
    }

    var result = [];
    splits = splits.slice(1);

    for (var i in splits) {
        result.push(String.fromCharCode(parseInt(splits[i], 16)));
    }

    return result;
};

module.exports = CcdbUtil;