export default {

    encrypt (content) {
        let result = [];
        let passcode = "FUtruJistob";
        let passLen = passcode.length;


        for (let i = 0; i < content.length; i++) {
            let passOffset = i % passLen;
            let calAscii = (content.charCodeAt(i) + passcode.charCodeAt(passOffset));
            result.push(calAscii);
        }

        return JSON.stringify(result);
    },

    decrypt (content) {
        let result = [];
        let str = '';
        let passcode = "FUtruJistob";
        let codesArr = JSON.parse(content);
        let passLen = passcode.length;


        for (let i = 0; i < codesArr.length; i++) {
            let passOffset = i % passLen;
            let calAscii = (codesArr[i] - passcode.charCodeAt(passOffset));
            result.push(calAscii);
        }
        for (let i = 0; i < result.length; i++) {
            let ch = String.fromCharCode(result[i]); str += ch;
        }
        return str;
    }
}