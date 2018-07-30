

$(function () {
    /* 初始化控件 */
    $("#switch-state").bootstrapSwitch({
        onText: "ON",      // 设置ON文本
        offText: "OFF",    // 设置OFF文本
        onColor: "success",// 设置ON文本颜色     (info/success/warning/danger/primary)
        offColor: "info",  // 设置OFF文本颜色        (info/success/warning/danger/primary)
        size: "mini",    // 设置控件大小,从小到大  (mini/small/normal/large)
        // 当开关状态改变时触发
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
        onText: "ON",      // 设置ON文本
        offText: "OFF",    // 设置OFF文本
        onColor: "success",// 设置ON文本颜色     (info/success/warning/danger/primary)
        offColor: "info",  // 设置OFF文本颜色        (info/success/warning/danger/primary)
        size: "mini",    // 设置控件大小,从小到大  (mini/small/normal/large)
        // 当开关状态改变时触发
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
//        onText: "ON",      // 设置ON文本
//        offText: "OFF",    // 设置OFF文本
//        onColor: "success",// 设置ON文本颜色     (info/success/warning/danger/primary)
//        offColor: "info",  // 设置OFF文本颜色        (info/success/warning/danger/primary)
//        size: "mini",    // 设置控件大小,从小到大  (mini/small/normal/large)
//        // 当开关状态改变时触发
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