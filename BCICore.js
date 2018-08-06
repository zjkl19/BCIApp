const oriCoeffs = [0.30, 0.15, 0.25, 0.10, 0.10, 0.10];
var calcCoeffs = oriCoeffs

Vue.component('t-component', {
    template: `
<div>
lbt</br>
tbl</br>
</div>`
});

Vue.component('PC-RC-component', {
    props: ['vlu'],
    template: `
                    <tbody>
                        <tr>
                            <td rowspan="8">
                                PC或RC梁式构件
                            </td>
                            <td>表面裂缝</td>
                            <td>梁表面出现细微不规则裂缝</td>
                            <td></td>
                            <td>网状裂缝的总面积占整个梁底表面积的百分比</td>
                            <td><input v-model="vlu[0]" /></td>
                        </tr>
                        <tr>

                            <td>混凝土剥离</td>
                            <td>梁表面混凝土破裂脱落</td>
                            <td></td>
                            <td>混凝土剥离的总面积占整个梁底表面积的百分比</td>
                            <td><input v-model="vlu[1]"/></td>
                        </tr>
                        <tr>

                            <td>露筋锈蚀</td>
                            <td>梁表面混凝土脱落后露出内嵌的钢筋并且钢筋产生锈蚀</td>
                            <td></td>
                            <td>出现露筋锈蚀的总面积占整个梁底表而积的百分比</td>
                            <td><input type="text" v-model="vlu[2]" /></td>
                        </tr>
                        <tr>
                            <td>梁体下挠</td>
                            <td>梁体向下弯曲</td>
                            <td></td>
                            <td>“无”指梁体没有出现下挠;“轻微”指梁体出现轻微下挠但不超过允许值;“明显”指梁体明显下挠超过允许值</td>
                            <td><input type="text" v-model="vlu[3]" /></td>
                        </tr>
                        <tr>
                            <td>结构裂缝</td>
                            <td>梁体由于受力而产生的裂缝</td>
                            <td></td>
                            <td>“无”指没有出现结构裂缝;“明显”指结构裂缝宽度未超过允许限值;“严重”指结构裂缝宽度超过允许限值</td>
                            <td><input type="text" v-model="vlu[4]" /></td>
                        </tr>
                        <tr>
                            <td>裂缝处渗水</td>
                            <td>梁体裂缝处有渗水痕迹</td>
                            <td></td>
                            <td>“无”指裂缝处没有渗水痕迹;“轻微”指裂缝处轻微渗水，渗水痕迹面积不大且并不明显;“严重”指裂缝处严重渗水，渗水痕迹面积较大且非常明显</td>
                            <td><input type="text" v-model="vlu[5]" /></td>
                        </tr>
                        <tr>
                            <td>贯通横缝</td>
                            <td>与桥面道路中线大致垂直并且在横向可能贯通整个桥面的裂缝，有时伴有少量支缝</td>
                            <td></td>
                            <td>裂缝在垂直于桥面道路中线方向的贯通程度</td>
                            <td><input type="text" v-model="vlu[61]"/></td>
                        </tr>
                        <tr>
                            <td>梁体位移</td>
                            <td>梁体出现水平偏移和转动</td>
                            <td></td>
                            <td>“无”指梁体没有偏移或转动;“明显”指梁体出现偏移或转动;“严重”指梁体出现严重偏移或转动且存在落梁或倾覆的风险</td>
                            <td><input type="text" v-model="vlu[7]" /></td>
                        </tr>
                    </tbody>`,
});

Vue.component('steel-component', {
    props: ['vlu'],
    template: `
                    <tbody>
                        <tr>
                            <td rowspan="10">
                                钢结构物
                            </td>
                            <td>变色起皮</td>
                            <td>钢结构物表面油漆变色或漆皮隆起</td>
                            <td></td>
                            <td>变色起皮的总面积占整个钢结构物表面积的百分比</td>
                            <td><input type="text" v-model="vlu[0]" /></td>
                        </tr>
                        <tr>

                            <td>油漆剥落</td>
                            <td>钢结构物表面油漆剥落</td>
                            <td></td>
                            <td>剥落的总面积占整个钢结构物表面积的百分比</td>
                            <td><input type="text" v-model="vlu[1]" /></td>
                        </tr>
                        <tr>
                            <td>一般锈蚀</td>
                            <td>钢结构物表面出现锈斑</td>
                            <td></td>
                            <td>一般锈蚀的总面积占整个钢结构物表面积的百分比</td>
                            <td><input type="text" v-model="vlu[2]" /></td>
                        </tr>
                        <tr>
                            <td>严重锈蚀</td>
                            <td>钢结构出现易剥落的锈层或厚度明显变薄</td>
                            <td></td>
                            <td>严重锈蚀的总面积占整个钢结构物表面积的百分比</td>
                            <td><input v-model="vlu[3]" /></td>
                        </tr>
                        <tr>
                            <td>锈蚀成洞</td>
                            <td>钢结构物生锈并被洞穿</td>
                            <td></td>
                            <td>“无”指钢结构物没有出现锈蚀成洞；“局部”指钢结构物局部出现锈蚀成洞；“大量”指钢结构物出现大量的锈蚀成洞</td>
                            <td><input v-model="vlu[4]" /></td>
                        </tr>
                        <tr>
                            <td>焊缝裂纹</td>
                            <td>钢结构物上的焊缝出现裂纹</td>
                            <td></td>
                            <td>“无”指焊缝没有裂纹；“少量”指焊缝《10%裂缝；“严重”指>10%焊缝出现裂纹</td>
                            <td><input v-model="vlu[5]" /></td>
                        </tr>
                        <tr>
                            <td>焊缝开裂</td>
                            <td>钢结构物上的焊缝开裂</td>
                            <td></td>
                            <td>“无”指焊缝没有出现开裂；“少量”指焊缝&lt;10%开裂；“严重”指>10%焊缝出现开裂</td>
                            <td><input v-model="vlu[6]" /></td>
                        </tr>
                        <tr>
                            <td>铆钉损失</td>
                            <td>钢结构物上的铆钉损失或丢失</td>
                            <td></td>
                            <td>损失的铆钉数站所有铆钉总数的比例</td>
                            <td><input v-model="vlu[7]" /></td>
                        </tr>
                        <tr>
                            <td>螺栓松动</td>
                            <td>钢结构物上的螺栓出现松动</td>
                            <td></td>
                            <td>“无”指没有螺栓出现松动；“少量”指&lt;20%螺栓出现松动；“大量”指>20%螺栓出现松动</td>
                            <td><input v-model="vlu[8]" /></td>
                        </tr>
                        <tr>
                            <td>错位变形</td>
                            <td>钢梁、钢盖梁、钢墩台身因非正常变形，出现的扭曲、错位</td>
                            <td></td>
                            <td>“轻微”指弯曲翘曲不明显；“明显”指出现变形但不影响结构功能；“严重”指出现严重变形且影响结构功能</td>
                            <td><input v-model="vlu[9]" /></td>
                        </tr>
                    </tbody>`,
});

var vm = new Vue({
    el: '#VueBridge',
    data: {
        bridgeSelected: '',

        mainExists: [1, 1, 1, 1, 1, 1],
        coeffs: [0.30, 0.15, 0.25, 0.10, 0.10, 0.10],
        DP1: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        beamComponent: [],
        beamGirderWeight: 6,
        beamHorizontalTiesWeight: 4,

        vlu: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,           
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        BeamBridgeId:['PC_RC_Beam','beamGirderSteel'],

        //下标 0-17
        //beamDP1: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,           //主梁,PC或RC梁式构件
        //    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//主梁,钢结构物

        beamGirderPCRCDP: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//主梁,PC或RC梁式构件
        beamGirderSteelDP: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//主梁,钢结构物]

        beamDP3: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//横向联系,横向联系
        beamDP4: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//横向联系,钢结构物

    },
    computed: {
        beamDP1: function () {
            return this.beamGirderPCRCDP.concat(this.beamGirderSteelDP);
        },


        calcCoeffs: function () {
            return [this.GetcalcCoeffs(0), this.GetcalcCoeffs(1), this.GetcalcCoeffs(2)
                , this.GetcalcCoeffs(4), this.GetcalcCoeffs(4), this.GetcalcCoeffs(5)]
        },
        sigmaDP1: function () {
            var sum = 0
            for (i = 0; i < this.DP1.length; i++)
                sum += this.DP1[i] * 1.0;
            return sum.toFixed(3)
        },
        u1: function () {
            return [this.DP1[0] / this.sigmaDP1, this.DP1[1] / this.sigmaDP1, this.DP1[2] / this.sigmaDP1
                , this.DP1[3] / this.sigmaDP1, this.DP1[4] / this.sigmaDP1, this.DP1[5] / this.sigmaDP1
                , this.DP1[6] / this.sigmaDP1, this.DP1[7] / this.sigmaDP1, this.DP1[8] / this.sigmaDP1, this.DP1[9] / this.sigmaDP1]
        },
        w1: function () {
            return [this.getWeight(this.u1[0]), this.getWeight(this.u1[1]), this.getWeight(this.u1[2])
                , this.getWeight(this.u1[3]), this.getWeight(this.u1[4]), this.getWeight(this.u1[5])
                , this.getWeight(this.u1[6]), this.getWeight(this.u1[7]), this.getWeight(this.u1[8]), this.getWeight(this.u1[9])]
        },
        MDP1: function () {
            var sum = 0
            for (i = 0; i < this.DP1.length; i++)
                sum += this.DP1[i] * this.w1[i] * 1.0;
            return sum.toFixed(3)
        },
        showState: function (v) {
            if (v == "beam")
                return true;
            else
                return false;
        },
        isShow: function () {
            if (this.bridgeSelected == "beam")
                return true
            else
                return false
        },
        //损坏扣分值的总和
        beamSigmaDP1: function () {
            var sum = 0
            for (i = 0; i < this.beamDP1.length; i++)
                sum += this.beamDP1[i] * 1.0;
            return sum.toFixed(3)
        },
        //第[i]项(i>=0)表示第i+1项损坏的扣分值占所有损坏扣分值的比例
        beam_u1: function () {

            var arr1 = this.beamDP1
            var arr2 = this.beamSigmaDP1

            var result = arr1.map(function (item) {
                return item / arr2;
            });

            return result
        },
        //第[i]项(i>=0)表示第i+1项类构件的权重
        beam_w1: function () {

            var arr1 = this.beam_u1

            var result = arr1.map(function (u) {
                return parseFloat(3.0 * u ** 3 - 5.5 * u ** 2 + 3.5 * u).toFixed(3);    //日后重构
            });

            return result
        },

        //构件综合扣分值,详见规范P18,4.5.4-4
        SDP1: function () {
            var SDP = 0
            for (i = 0; i < this.beamDP1.length; i++)
                SDP += this.beamDP1[i] * this.beam_w1[i] * 1.0;
            if (SDP < Math.max(...this.beamDP1))
                SDP = Math.max(...this.beamDP1)
            return SDP.toFixed(3)
        },

        //计算梁桥各个构件的权重
        beamComponentWeights: function () {
            //初始化结果
            var result = [0.0, 0.0]
            var beamSum = 0.0
            var beamGirderNume = 0.0
            var beamHorizontalTiesNume = 0.0
            //1、获取checkbox的状态
            if ($.inArray('beam_girder', this.beamComponent) >= 0) {
                beamSum = beamSum + this.beamGirderWeight
                beamGirderNume = this.beamGirderWeight
            }

            if ($.inArray('beam_horizontal_ties', this.beamComponent) >= 0) {
                beamSum = beamSum + this.beamHorizontalTiesWeight
                beamHorizontalTiesNume = this.beamHorizontalTiesWeight
            }

            result = [beamGirderNume / beamSum, beamHorizontalTiesNume / beamSum]

            return result
        },

    },
    function() {
        return {
            items: [{
                state: false
            }, {
                state: true
            }]
        };
    },
    methods: {
        details: function () {
            return this.site + " - 学的不仅是技术，更是梦想！";
        },
        testOutput: function (num) {
            return parseFloat(num);
        },
        getWeight: function (u) {
            return parseFloat(3.0 * u ** 3 - 5.5 * u ** 2 + 3.5 * u).toFixed(3);
        },
        GetcalcCoeffs: function (index) {
            var sum = 0
            for (i = 0; i < this.coeffs.length; i++)
                sum += this.mainExists[i] * this.coeffs[i];
            return (this.mainExists[index] * this.coeffs[index] / sum).toFixed(3);
        },
        toggle: function () {
            this.isShow = !this.isShow;
        },
        setShowState: function (v) {
            if (v == "beam")
                return true
            else
                return false
        },

    }
})