

$(function () {
    /* ��ʼ���ؼ� */
    $("#switch-beamGirderPCRC").bootstrapSwitch({
        onText: "ON",      // ����ON�ı�
        offText: "OFF",    // ����OFF�ı�
        onColor: "success",// ����ON�ı���ɫ     (info/success/warning/danger/primary)
        offColor: "info",  // ����OFF�ı���ɫ        (info/success/warning/danger/primary)
        size: "mini",    // ���ÿؼ���С,��С����  (mini/small/normal/large)
        // ������״̬�ı�ʱ����
        onSwitchChange: function (event, state) {
            if (state == true) {
                $("#beamGirderPC_RC").show();
                //alert("ON");
            } else {
                $("#beamGirderPC_RC").hide();
                //alert("OFF");
            }
        }
    });
    $("#switch-beamGirderSteel").bootstrapSwitch({
        onText: "ON",      // ����ON�ı�
        offText: "OFF",    // ����OFF�ı�
        onColor: "success",// ����ON�ı���ɫ     (info/success/warning/danger/primary)
        offColor: "info",  // ����OFF�ı���ɫ        (info/success/warning/danger/primary)
        size: "mini",    // ���ÿؼ���С,��С����  (mini/small/normal/large)
        // ������״̬�ı�ʱ����
        onSwitchChange: function (event, state) {
            if (state == true) {
                $("#beamGirderSteel").show();
                //alert("ON");
            } else {
                $("#beamGirderSteel").hide();
                //alert("OFF");
            }
        }
    });
    $("#switch-beamHTiesHTies").bootstrapSwitch({
        onText: "ON",      // ����ON�ı�
        offText: "OFF",    // ����OFF�ı�
        onColor: "success",// ����ON�ı���ɫ     (info/success/warning/danger/primary)
        offColor: "info",  // ����OFF�ı���ɫ        (info/success/warning/danger/primary)
        size: "mini",    // ���ÿؼ���С,��С����  (mini/small/normal/large)
        // ������״̬�ı�ʱ����
        onSwitchChange: function (event, state) {
            if (state == true) {
                $("#beamHTiesHTies").show();
            } else {
                $("#beamHTiesHTies").hide();
            }
        }
    });
    $("#switch-beamHTiesSteel").bootstrapSwitch({
        onText: "ON",      // ����ON�ı�
        offText: "OFF",    // ����OFF�ı�
        onColor: "success",// ����ON�ı���ɫ     (info/success/warning/danger/primary)
        offColor: "info",  // ����OFF�ı���ɫ        (info/success/warning/danger/primary)
        size: "mini",    // ���ÿؼ���С,��С����  (mini/small/normal/large)
        // ������״̬�ı�ʱ����
        onSwitchChange: function (event, state) {
            if (state == true) {
                $("#beamHTiesSteel").show();
            } else {
                $("#beamHTiesSteel").hide();
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