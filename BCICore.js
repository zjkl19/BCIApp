const oriCoeffs = [0.30, 0.15, 0.25, 0.10, 0.10, 0.10];
var calcCoeffs = oriCoeffs



var vm = new Vue({
    el: '#VueBridge',
    data: {
        bridgeSelected: '',

        mainExists: [1, 1, 1, 1, 1, 1],
        coeffs: [0.30, 0.15, 0.25, 0.10, 0.10, 0.10],
        DP1: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],



        cantileverSuspendedComponent: [],
        cantileverSuspendedWeight:[6,2,1,1],    //初始值:悬臂梁6,挂梁2,挂梁支座1,防落梁1

        cantileverSuspendedComponent01: [],

        vlu: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,           
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        cantileverSuspendedBridgeId:
            ['cantileverSuspendedCantileverPCRC', 'cantileverSuspendedSuspendedPCRC'
                , 'cantileverSuspendedSuspendedSteel', 'cantileverSuspendedSuspendedSupportSupport'
                ,'cantileverSuspendedFallpreventFallprevent'],

        beamComponent: [],//最大数组：["beam01","beam02"]
        beamComponentMatch: ["beam01", "beam02"],
        beamWeight:[6,4],
        //下标 0-17
        beamId: ['beam11', 'beam12', 'beam21', 'beam22'],
        beamDP11: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//主梁,PC或RC梁式构件
        beamDP12: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//主梁,钢结构物
        beamDP21: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//横向联系,横向联系
        beamDP22: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],//横向联系,钢结构物



        //计算"悬臂+挂梁"各个构件的权重
        cantileverSuspendedComponentWeights: function () {
            var result = [0.0, 0.0, 0.0, 0.0]
            var Sum = 0.0
            var ComponentMatch = ['cantileverSuspendedCantilever', 'cantileverSuspendedSuspended'
                , 'cantileverSuspendedSupport', 'cantileverSuspendedFallprevent']

            for (i = 0; i < ComponentMatch.length; i++) {
                if ($.inArray(ComponentMatch[i], this.cantileverSuspendedComponent) >= 0) {
                    Sum += this.cantileverSuspendedWeight[i]
                }
            }
            var arr1 = this.cantileverSuspendedWeight
            var result = arr1.map(function (item) {
                return item / Sum;
            });

            return result
        },

        //开关控制是否显示
        //参数：
        //MatchId:匹配Id
        //MatchArray:匹配数组
        switchShow: function (MatchId, MatchArray) {
            if ($.inArray(MatchId, MatchArray) >= 0)
                return true;
            else
                return false;
        },

        cantileverSuspendedCantileverPCRCDP:
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        cantileverSuspendedSuspendedPCRCDP:
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        cantileverSuspendedSuspendedSteelDP:
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        cantileverSuspendedSuspendedSupportDP:
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        cantileverSuspendedFallpreventFallpreventDP:
            [0.0, 0.0, 0.0, 0.0,0.0,0.0],
    },
    computed: {
        //beamDP1: function () {
        //    return this.beamGirderPCRCDP.concat(this.beamGirderSteelDP);
        //},
        //beamDP2: function () {
        //    return this.beamHTiesHTiesDP.concat(this.beamHTiesSteelDP);
        //},
        //计算梁桥各个构件的权重
        //ComponentMatch:匹配数组
        beamComponentWeights: function () {
            return this.getComponentWeights(this.beamComponentMatch, this.beamComponent, this.beamWeight)
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
        cantileverSuspendedIsShow: function () {
            if (this.bridgeSelected == "cantileverSuspended")
                return true
            else
                return false
        },
        trussIsShow: function () {
            if (this.bridgeSelected == "truss")
                return true
            else
                return false
        },
        rigidIsShow: function () {
            if (this.bridgeSelected == "rigid")
                return true
            else
                return false
        },

        beamSigmaDP: function () {
            return [this.getSigmaDP(this.beamDP1), this.getSigmaDP(this.beamDP2)]
        },

        //第[i]项(i>=0)表示第i+1项损坏的扣分值占所有损坏扣分值的比例
        //beam_u1: function () {
        //    return this.get_u(this.beamDP1, this.beamSigmaDP[0])
        //},
        //beam_u2: function () {
        //    return this.get_u(this.beamDP2, this.beamSigmaDP[1])
        //},

        ////第[i]项(i>=0)表示第i+1项类构件的权重
        //beam_w1: function () {
        //    return this.get_w(this.beam_u1)
        //},
        //beam_w2: function () {
        //    return this.get_w(this.beam_u2)
        //},

        ////构件综合扣分值,详见规范P18,4.5.4-4
        //beam_SDP1: function () {
        //    return this.getSDP(this.beamDP1, this.beam_w1)
        //},
        //beam_SDP2: function () {
        //    return this.getSDP(this.beamDP2, this.beam_w2)
        //},

        

        isShowTest: function () {
            if ($.inArray('cantileverSuspendedCantileverPCRC', this.cantileverSuspendedComponent01) >= 0)
                return true;
            else
                return false;
        },
        //单跨BCIs

        BCIs: function () {
            return this.beamComponentWeights[0] * (100 - (this.beamComponentWeights[0] ? this.beam_SDP1 : 0)) + this.beamComponentWeights[1] * (100 - (this.beamComponentWeights[1] ? this.beam_SDP2 : 0))
        }

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
        getSigmaDP: function (DPArray) {
            var sum = 0
            for (i = 0; i < DPArray.length; i++)
                sum += DPArray[i] * 1.0;
            return sum.toFixed(3)
        },

        get_u: function (DPArray, SigmaDP) {
            var arr1 = DPArray
            var arr2 = SigmaDP
            var result = arr1.map(function (item) {
                return item / arr2;
            });
            return result
        },
        get_w: function (uArray) {
            var result = uArray.map(function (u) {
                return parseFloat(3.0 * u ** 3 - 5.5 * u ** 2 + 3.5 * u).toFixed(3);    //日后重构
            });
            return result
        },
        getSDP: function (DPArray,wArray) {
            var SDP = 0
            for (i = 0; i < DPArray.length; i++)
                SDP += DPArray[i] * wArray[i] * 1.0;
            if (SDP < Math.max(...DPArray))
                SDP = Math.max(...DPArray)
            return SDP.toFixed(3)
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
``
            if (v == "beam")
                return true
            else
                return false
        },

        //计算各个构件的权重
        //componentMatch:匹配组件数组
        //componentSelected:已选组件
        //componentWeight:各组件权重
        /**
         * 
         * @param componentMatch 匹配组件数组
         * @param componentSelected 已选组件
         * */
        getComponentWeights: function (componentMatch, componentSelected, componentWeight) {
            //初始化结果
            var result = []  //最终求得的权重
            for (i = 0; i < componentMatch.length; i++) {    //初始化权重
                result.push(0)
            }

            var Sum = 0.0
            var newWeight = componentWeight.slice()
            //求已选组件的权重和
            for (i = 0; i < componentMatch.length; i++) {
                if ($.inArray(componentMatch[i], componentSelected) >= 0) {
                    Sum += componentWeight[i]
                }
                else {
                    newWeight[i]=0.0
                }
            }
            
            //重新计算权重
            var result = newWeight.map(function (item) {
                return (item / Sum)*1.000
            });

            return result

        },

        //计算"悬臂+挂梁"各个构件的权重
        cantileverSuspendedComponentWeights: function () {
            var result = [0.0, 0.0, 0.0, 0.0]
            var Sum = 0.0
            var ComponentMatch = ['cantileverSuspendedCantilever', 'cantileverSuspendedSuspended'
                , 'cantileverSuspendedSupport', 'cantileverSuspendedFallprevent']

            for (i = 0; i < ComponentMatch.length; i++) {
                if ($.inArray(ComponentMatch[i], this.cantileverSuspendedComponent) >= 0) {
                    Sum += this.cantileverSuspendedWeight[i]
                }
            }
            var arr1 = this.cantileverSuspendedWeight
            var result = arr1.map(function (item) {
                return item / Sum;
            });

            return result
        },

    }
})


Vue.component('t1-component', {
    props: ['vlu'],
    template: `<div>
    {{vlu}}
    <t-component :vlu="vlu"></t-component>
    </div>`
});
Vue.component('t-component', {
    props: ['vlu'],
    template: `
<div>
lbt</br>
{{vlu}}</br>
</div>`
});

Vue.component('t2-component', {
    template: `
<table>
    <tbody>tt</tbody>
    <tbody>tt1</tbody>
</table>    
`
});

Vue.component('bridge-classif-component', {
    props: ['classf'],
    template: `
<table class="table table-bordered">
                    <thead>
                        <tr>
                            <td>构件类型</td>
                            <td>损坏类型</td>
                            <td>定义</td>
                            <td>损坏评价标准</td>
                            <td>说明</td>
                            <td>扣分值</td>
                        </tr>
                    </thead>
<tbody is="PC-RC-component1" vlu="ceshi" ></tbody>
</table>
`
});
Vue.component('PC-RC-component1', {
    props: ['vlu'],
    template: `
                    <tbody>
                        <tr>
                            <td>
                                PC或RC梁式构件
                            </td>
                            <td>表面裂缝{{vlu}}</td>
                            <td>梁表面出现细微不规则裂缝</td>
                            <td></td>
                            <td>网状裂缝的总面积占整个梁底表面积的百分比</td>
                            <td><input /></td>
                        </tr>
                   
                    </tbody>`,
});
var arr = [
    { comp: "主梁", evalItem: ["pc", "steel"] },
    { comp: "横向联系", evalItem: ["pc1", "steel1"] }
];

//PC或RC梁式构件
//8项
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
                            <td><input type="text" v-model="vlu[6]"/></td>
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

Vue.component('horizontal-ties-component', {
    props: ['vlu'],
    template: `
                   <tbody>
                        <tr>
                            <td rowspan="6">横向联系</td>
                            <td>贯通纵缝</td>
                            <td>与桥面道路中线大致平行并且在纵向可能贯通整个桥面的裂缝，有时伴有少量支缝</td>
                            <td></td>
                            <td>裂缝在平行于桥面道路中线方向的贯通程度</td>
                            <td><input v-model="vlu[0]" /></td>
                        </tr>
                        <tr>
                            <td>连接件脱焊松动</td>
                            <td>连接件从焊接处脱落而产生松动</td>
                            <td></td>
                            <td>产生脱焊松动的连接件数占所有连接件总数的百分比</td>
                            <td><input  v-model="vlu[1]" /></td>
                        </tr>
                        <tr>
                            <td>连接件断裂</td>
                            <td>连接件出现断裂</td>
                            <td></td>
                            <td>产生断裂的连接件数占所有连接件总数的百分比</td>
                            <td><input  v-model="vlu[2]" /></td>
                        </tr>
                        <tr>
                            <td>横隔板网裂</td>
                            <td>横隔板表面出现网状裂缝</td>
                            <td></td>
                            <td>横隔板网裂总面积占整个横隔板表面积的百分比</td>
                            <td><input  v-model="vlu[3]" /></td>
                        </tr>
                        <tr>
                            <td>横隔板剥落露筋</td>
                            <td>横隔板表面混凝土剥落露出内嵌的钢筋</td>
                            <td></td>
                            <td>横隔板剥落露筋总面积占整个横隔板表面积的百分比</td>
                            <td><input  v-model="vlu[4]"/></td>
                        </tr>
                        <tr>
                            <td>梁体异常振动</td>
                            <td>梁体出现非正常的振动</td>
                            <td></td>
                            <td>“无”指梁体没有异常振动;“轻微”指梁体有轻微的异常振动，这种振动不易被感知;“严重”指梁体出现明显的异常振动</td>
                            <td><input  v-model="vlu[5]"/></td>
                        </tr>
                    </tbody>`,
});

Vue.component('support-component', {
    props: ['vlu'],
    template: `
                    <tbody>
                        <tr>
                            <td rowspan="6">
                                支座
                            </td>
                            <td>支座固定螺栓损坏</td>
                            <td>用于固定支座的螺栓损坏、松动</td>
                            <td></td>
                            <td>/</td>
                            <td><input v-model="vlu[0]" /></td>
                        </tr>
                        <tr>

                            <td>橡胶支座变形</td>
                            <td>橡胶材料类支座变形、开裂</td>
                            <td></td>
                            <td>/</td>
                            <td><input v-model="vlu[1]" /></td>
                        </tr>
                        <tr>

                            <td>钢支座损坏</td>
                            <td>钢支座类支座松动、锈蚀</td>
                            <td></td>
                            <td>/</td>
                            <td><input type="text" v-model="vlu[2]" /></td>
                        </tr>
                        <tr>
                            <td>支座底板混凝土破损</td>
                            <td>支座底部的水泥混凝土板</td>
                            <td></td>
                            <td>/</td>
                            <td><input type="text" v-model="vlu[3]" /></td>
                        </tr>
                        <tr>
                            <td>支承稳定性异常</td>
                            <td>支座的支承稳定性</td>
                            <td></td>
                            <td>/</td>
                            <td><input type="text" v-model="vlu[4]" /></td>
                        </tr>
                        <tr>
                            <td>钢垫板锈蚀</td>
                            <td>支座上、下垫板锈蚀</td>
                            <td></td>
                            <td>/</td>
                            <td><input type="text" v-model="vlu[5]" /></td>
                        </tr>
                    </tbody>`,
});

Vue.component('fallprevent-component', {
    props: ['vlu'],
    template: `<tbody>
                        <tr>
                            <td rowspan="4">
                                防落梁装置
                            </td>
                            <td>有无落架趋势</td>
                            <td>由于防落梁装置的作用而使桥梁结构有或无落架的趋势</td>
                            <td></td>
                            <td>/</td>
                            <td><input v-model="vlu[0]" /></td>
                        </tr>
                        <tr>
                            <td>牛腿表面损伤</td>
                            <td>防落梁装置的牛腿表面被损坏</td>
                            <td></td>
                            <td>/</td>
                            <td><input v-model="vlu[1]" /></td>
                        </tr>
                        <tr>

                            <td>伸缩缝处渗水</td>
                            <td>防落梁伸缩缝处有渗水的痕迹</td>
                            <td></td>
                            <td>/</td>
                            <td><input type="text" v-model="vlu[2]" /></td>
                        </tr>
                        <tr>
                            <td>钢锚板锈蚀</td>
                            <td>防落梁装置上起锚固作用的钢板</td>
                            <td></td>
                            <td>/</td>
                            <td><input type="text" v-model="vlu[3]" /></td>
                        </tr>
                    </tbody>`,
});