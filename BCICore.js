const oriCoeffs = [0.30, 0.15, 0.25, 0.10, 0.10, 0.10];
var calcCoeffs = oriCoeffs
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

        //下标 0-17
        beamDP1: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,           //主梁,PC或RC梁式构件
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//主梁,钢结构物

        beamDP3: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//横向联系,横向联系
        beamDP4: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//横向联系,钢结构物

    },
    computed: {
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