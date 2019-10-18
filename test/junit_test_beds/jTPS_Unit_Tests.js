/**package junit_test_beds;

import demo.AddToNum_Transaction;
import demo.AndMask_Transaction;
import demo.Num;
import jtps.jTPS;
import org.junit.Assert;
import org.junit.Test;**/

/**
 * jTPS_Unit_Tests.java
 * 
 * This file provides a test bed for the jTPS framework.
 * 
 * @author McKilla Gorilla
 * @version 2.0
 */
class jTPS_Unit_Tests {

    constructor(){

    }

    print(a){
        document.getElementById('results').innerHTML += a;
    }

    assertEquals(a, b){
        if (a == b){
            this.print("passed ");
        }
        else{
            this.print("failed ");
        }
    }
    assertFalse(bool){
        if (bool == false){
            this.print("passed ");
        }
        else{
            this.print("failed ");
        }
    }
    assertTrue(bool){
        if (bool){
            this.print("passed ");
        }
        else{
            this.print("failed ");
        }
    }

    /**
     * This JUnit test is for testing the adding of transactions.
     */
    //@Test
    testAdd() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        var tps = new jTPS();
        var num = new Num();
        this.print("Test Add: ");
        this.assertEquals(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        this.assertEquals(5, num.getNum());
        this.assertEquals(1, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(1, tps.getUndoSize());
        
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        this.assertEquals(15, num.getNum());
        this.assertEquals(2, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(2, tps.getUndoSize());
        
        // ADD 15 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        document.getElementById('results').innerHTML += "<br/>";
        document.getElementById('results').innerHTML += "<br/>";
    }
    
    /**
     * 
     */
    //@Test
    testAndMask() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        var tps = new jTPS();
        var num = new Num();
        this.print("Test And Mask: ");
        this.assertEquals(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        this.assertEquals(4, num.getNum());
        this.assertEquals(2, tps.getSize());
        
        tps.undoTransaction();
        this.assertEquals(12, num.getNum());
        this.assertEquals(2, tps.getSize());
        this.assertEquals(1, tps.getRedoSize());
        this.assertEquals(1, tps.getUndoSize());
        document.getElementById('results').innerHTML += "<br/>";
        document.getElementById('results').innerHTML += "<br/>";
    }
    
    testOrMask() {
        
    }

    /**
     * This JUnit test is for testing the undoing of transactions.
     */
    //@Test
    testUndo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        var tps = new jTPS();
        var num = new Num();
        this.print("Test Undo: ");
        this.assertEquals(num.getNum(), 0);
        this.assertFalse(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION
        tps.undoTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(15, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(1, tps.getRedoSize());
        this.assertEquals(2, tps.getUndoSize());
        
        // UNDO ANOTHER
        tps.undoTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(5, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(2, tps.getRedoSize());
        this.assertEquals(1, tps.getUndoSize());
        
        // AND ANOTHER
        tps.undoTransaction();
        this.assertFalse(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(0, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(3, tps.getRedoSize());
        this.assertEquals(0, tps.getUndoSize());
        
        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        this.assertFalse(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(0, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(3, tps.getRedoSize());
        this.assertEquals(0, tps.getUndoSize());
        document.getElementById('results').innerHTML += "<br/>";
        document.getElementById('results').innerHTML += "<br/>";
    }
    
    /**
     * This JUnit test is for testing the redoing of transactions.
     */
    //@Test
    testRedo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        var tps = new jTPS();
        var num = new Num();
        this.print("Test Redo: ");
        this.assertEquals(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(15, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(1, tps.getRedoSize());
        this.assertEquals(2, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        document.getElementById('results').innerHTML += "<br/>";
        document.getElementById('results').innerHTML += "<br/>";
    }    

    /**
     * This JUnit test is for testing clearing of transactions.
     */
    //@Test
    testClear() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        var tps = new jTPS();
        var num = new Num();
        this.print("Test Clear: ");
        this.assertEquals(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
                
        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        this.assertEquals(35, num.getNum());
        this.assertEquals(0, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertEquals(70, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        this.assertEquals(70, num.getNum());
        this.assertEquals(0, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertEquals(105, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        document.getElementById('results').innerHTML += "<br/>";
        document.getElementById('results').innerHTML += "<br/>";
    }
}