

$(function () {
    /* ��ʼ���ؼ� */
    $("#switch-state").bootstrapSwitch({
        onText: "ON",      // ����ON�ı�
        offText: "OFF",    // ����OFF�ı�
        onColor: "success",// ����ON�ı���ɫ     (info/success/warning/danger/primary)
        offColor: "info",  // ����OFF�ı���ɫ        (info/success/warning/danger/primary)
        size: "mini",    // ���ÿؼ���С,��С����  (mini/small/normal/large)
        // ������״̬�ı�ʱ����
        onSwitchChange: function (event, state) {
            if (state == true) {
                $("#PC_RC_Beam").show();
                //alert("ON");
            } else {
                $("#PC_RC_Beam").hide();
                //alert("OFF");
            }
        }
    });
    $("#steel_struct_switch-state").bootstrapSwitch({
        onText: "ON",      // ����ON�ı�
        offText: "OFF",    // ����OFF�ı�
        onColor: "success",// ����ON�ı���ɫ     (info/success/warning/danger/primary)
        offColor: "info",  // ����OFF�ı���ɫ        (info/success/warning/danger/primary)
        size: "mini",    // ���ÿؼ���С,��С����  (mini/small/normal/large)
        // ������״̬�ı�ʱ����
        onSwitchChange: function (event, state) {
            if (state == true) {
                $("#steelStruct").show();
                //alert("ON");
            } else {
                $("#steelStruct").hide();
                //alert("OFF");
            }
        }
    });

});

//$(function () {

//    $("#switch-state").bootstrapSwitch({
//        onText: "ON",      // ����ON�ı�
//        offText: "OFF",    // ����OFF�ı�
//        onColor: "success",// ����ON�ı���ɫ     (info/success/warning/danger/primary)
//        offColor: "info",  // ����OFF�ı���ɫ        (info/success/warning/danger/primary)
//        size: "mini",    // ���ÿؼ���С,��С����  (mini/small/normal/large)
//        // ������״̬�ı�ʱ����
//        onSwitchChange: function (event, state) {
//            if (state == true) {
//                $("#PC_RC_Beam").show();
//                //alert("ON");
//            } else {
//                $("#PC_RC_Beam").hide();
//                //alert("OFF");
//            }
//        }
//    });

//});