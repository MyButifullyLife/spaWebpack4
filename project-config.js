
let exports ={
    // 是否是测试环境
    get isTest() {
        return $envType.type === 0;
    }
}
export default exports