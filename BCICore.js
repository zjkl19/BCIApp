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

        //�±� 0-17
        beamDP1: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,           //����,PC��RC��ʽ����
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//����,�ֽṹ��

        beamDP3: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//������ϵ,������ϵ
        beamDP4: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//������ϵ,�ֽṹ��

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
        //�𻵿۷�ֵ���ܺ�
        beamSigmaDP1: function () {
            var sum = 0
            for (i = 0; i < this.beamDP1.length; i++)
                sum += this.beamDP1[i] * 1.0;
            return sum.toFixed(3)
        },
        //��[i]��(i>=0)��ʾ��i+1���𻵵Ŀ۷�ֵռ�����𻵿۷�ֵ�ı���
        beam_u1: function () {

            var arr1 = this.beamDP1
            var arr2 = this.beamSigmaDP1

            var result = arr1.map(function (item) {
                return item / arr2;
            });

            return result
        },
        //��[i]��(i>=0)��ʾ��i+1���๹����Ȩ��
        beam_w1: function () {

            var arr1 = this.beam_u1

            var result = arr1.map(function (u) {
                return parseFloat(3.0 * u ** 3 - 5.5 * u ** 2 + 3.5 * u).toFixed(3);    //�պ��ع�
            });

            return result
        },

        //�����ۺϿ۷�ֵ,����淶P18,4.5.4-4
        SDP1: function () {
            var SDP = 0
            for (i = 0; i < this.beamDP1.length; i++)
                SDP += this.beamDP1[i] * this.beam_w1[i] * 1.0;
            if (SDP < Math.max(...this.beamDP1))
                SDP = Math.max(...this.beamDP1)
            return SDP.toFixed(3)
        },

        //�������Ÿ���������Ȩ��
        beamComponentWeights: function () {
            //��ʼ�����
            var result = [0.0, 0.0]
            var beamSum = 0.0
            var beamGirderNume = 0.0
            var beamHorizontalTiesNume = 0.0
            //1����ȡcheckbox��״̬
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
            return this.site + " - ѧ�Ĳ����Ǽ������������룡";
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