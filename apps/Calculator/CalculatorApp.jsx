const { useState, useEffect, useReducer } = React;

const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    EVALUATE: 'evaluate',
    TOGGLE_SIGN: 'toggle-sign',
    PERCENTAGE: 'percentage'
};

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return { ...state, currentOperand: payload.digit, overwrite: false };
            }
            // limit to 9 digits
            const digitsOnly = (state.currentOperand || "").replace(".", "");
            if (digitsOnly.length >= 9) return state;

            if (payload.digit === "0" && state.currentOperand === "0") return state;
            if (payload.digit === "." && state.currentOperand && state.currentOperand.includes(".")) return state;
            if (payload.digit === "." && (state.currentOperand == null || state.currentOperand === "")) return { ...state, currentOperand: "0." };
            
            if (state.currentOperand === "0" && payload.digit !== ".") {
                return { ...state, currentOperand: payload.digit };
            }

            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            };
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) return state;
            if (state.currentOperand == null) return { ...state, operation: payload.operation };
            if (state.previousOperand == null) {
                return { ...state, operation: payload.operation, previousOperand: state.currentOperand, currentOperand: null };
            }
            return { ...state, previousOperand: evaluate(state), operation: payload.operation, currentOperand: null };
        case ACTIONS.CLEAR:
            if (state.currentOperand != null && state.currentOperand !== "0") {
                return { ...state, currentOperand: "0" };
            }
            return { currentOperand: "0", previousOperand: null, operation: null };
        case ACTIONS.EVALUATE:
            if (state.operation == null || state.currentOperand == null || state.previousOperand == null) return state;
            return { ...state, overwrite: true, previousOperand: null, operation: null, currentOperand: evaluate(state) };
        case ACTIONS.TOGGLE_SIGN:
            if (state.currentOperand == null || state.currentOperand === "0") return state;
            return { ...state, currentOperand: (parseFloat(state.currentOperand) * -1).toString() };
        case ACTIONS.PERCENTAGE:
            if (state.currentOperand == null) return state;
            return { ...state, currentOperand: (parseFloat(state.currentOperand) / 100).toString() };
        default: return state;
    }
}

function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return "";
    let comp = 0;
    switch (operation) {
        case "+": comp = prev + current; break;
        case "-": comp = prev - current; break;
        case "×": comp = prev * current; break;
        case "÷": comp = prev / current; break;
    }
    // precision issues fix
    return parseFloat(comp.toPrecision(12)).toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
function formatOperand(operand) {
    if (operand == null) return;
    if (operand === "Error") return operand;
    
    // convert e notation to standard if possible, else leave it
    if (operand.includes("e")) {
        return parseFloat(operand).toExponential(3);
    }
    const [integer, decimal] = operand.toString().split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

const CalculatorApp = () => {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, { currentOperand: "0" });
    
    // Calculate display length to scale text down if too long
    const displayValue = formatOperand(currentOperand) || formatOperand(previousOperand) || "0";
    const textLength = displayValue.length;
    let fontSize = "46px";
    if (textLength > 6) fontSize = "40px";
    if (textLength > 8) fontSize = "34px";
    if (textLength > 10) fontSize = "28px";

    const clearText = (currentOperand !== "0" && currentOperand != null) ? "C" : "AC";

    return (
        <div className="mac-calc">
            <div className="calc-display" style={{ fontSize }}>
                {displayValue}
            </div>
            <div className="calc-buttons">
                <button className="btn-top" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>{clearText}</button>
                <button className="btn-top" onClick={() => dispatch({ type: ACTIONS.TOGGLE_SIGN })}>+/-</button>
                <button className="btn-top" onClick={() => dispatch({ type: ACTIONS.PERCENTAGE })}>%</button>
                <button className={`btn-op ${operation === "÷" && currentOperand == null ? "active" : ""}`} onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "÷" }})}>÷</button>

                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "7" }})}>7</button>
                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "8" }})}>8</button>
                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "9" }})}>9</button>
                <button className={`btn-op ${operation === "×" && currentOperand == null ? "active" : ""}`} onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "×" }})}>×</button>

                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "4" }})}>4</button>
                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "5" }})}>5</button>
                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "6" }})}>6</button>
                <button className={`btn-op ${operation === "-" && currentOperand == null ? "active" : ""}`} onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "-" }})}>-</button>

                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "1" }})}>1</button>
                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "2" }})}>2</button>
                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "3" }})}>3</button>
                <button className={`btn-op ${operation === "+" && currentOperand == null ? "active" : ""}`} onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "+" }})}>+</button>

                <button className="btn-num btn-zero" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "0" }})}>0</button>
                <button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "." }})}>.</button>
                <button className="btn-op" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
            </div>
        </div>
    );
};

window.renderCalculatorApp = () => {
    const rootEl = document.getElementById('calculator-react-root');
    if (rootEl) {
        try {
            ReactDOM.render(<CalculatorApp />, rootEl);
        } catch (e) {
            console.error('CalculatorApp Render Error:', e);
        }
    }
};
