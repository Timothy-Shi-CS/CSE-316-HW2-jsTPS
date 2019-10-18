//package demo;

//import jtps.jTPS_Transaction;

/**
 *
 * @author McKillaGorilla
 */
class OrMask_Transaction{
    constructor(num, intNum, mask){
        // THIS IS THE OBJECT IT WILL MANIPULATE
        this.num = num;
    
        this.intNum = intNum;
    
        // AMOUNT TO MASK FOR NUM
        this.mask = mask;
    }

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
    OrMask_Transaction(initNum, initIntNum, initMask) {
        // KEEP THESE FOR LATER
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.num.orMask(this.mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.num.setNum(this.intNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Or Mask " + this.mask;
    }
}