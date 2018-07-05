var uruFields = (function() {
    var uruFields = {};
    uruFields.getValueFromField = getValueFromField;
    uruFields.setValueInField = setValueInField;

    function getValueFromField(inputId) {   
        var fieldElement =  $('#input' + inputId);
        var fieldVal = fieldElement.val();
        return fieldVal;
    }

    function setValueInField(inputId,inputVal) {
        $('#input' + inputId).val(inputVal);
    }
    
    return uruFields;
})();