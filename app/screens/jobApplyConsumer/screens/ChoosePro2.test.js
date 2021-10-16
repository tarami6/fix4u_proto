const rewire = require("rewire")
const ChoosePro2 = rewire("./ChoosePro2")
const ProReviewView = ChoosePro2.__get__("ProReviewView")

const ProReviewsView = ChoosePro2.__get__("ProReviewsView")
// @ponicode
describe("componentDidMount", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Michael", "Edmond", "Pierre Edouard"], ["Pierre Edouard", "Edmond", "Anas"], ["Jean-Philippe", "George", "Michael"]]
        inst = new ProReviewView(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentDidMount", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["George", "Anas", "George"], ["Jean-Philippe", "Michael", "Michael"], ["Pierre Edouard", "Jean-Philippe", "Jean-Philippe"]]
        inst = new ProReviewsView(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
