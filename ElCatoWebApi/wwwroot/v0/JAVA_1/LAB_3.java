package edu.uqu.cs;

/*
 * Lab 3
 * CS11211
 */

/*
* After the completion of this assignment, students should be able to: 
* Use the Scanner class to read input from the user
* Implement user-defined methods to do simple calculations
* Use Math API libary from Java
*/


import java.util.Scanner; 

public class App {
  
    /**
     * This is the same lab exercise as 4.14 on Zybooks
     * @see {@linktourl https://learn.zybooks.com/zybook/UmmAl-QuraUniversityCS1211QadahWinter2023/chapter/4/section/14 }
     *
     * One lap around a standard high-school running track is exactly 0.25 miles. 
     * Define a method named lapsToMiles that takes a double as a parameter, representing the number of laps, and returns a double that represents the number of miles. Then, write a main program that takes a number of laps as an input, calls method lapsToMiles() to calculate the number of miles, and outputs the number of miles.
     * Output each floating-point value with two digits after the decimal point, which can be achieved as follows:
     * System.out.printf("%.2f\n", yourValue);
     * 
     * Ex: If the input is:
     * 7.6
     * 
     * the output is:
     * 1.90
     * 
     * Ex: If the input is:
     * 2.2
     * 
     * the output is:
     * 0.55
     * 
     * The program must define and call a method:
     * public static double lapsToMiles(double userLaps)
     */


     /* Define the method `lapsToMiles` HERE */
    public static Double lapsToMiles(Double userLaps) {
        return userLaps * 0.25;
    }

    public static void part1(){
        Scanner scnr = new Scanner(System.in); 
        
        /* Write your code here which calls the method lapsToMiles */
        System.out.println("Enter laps: ");
        System.out.printf("%.2f\n", lapsToMiles(scnr.nextDouble()));
    }

    /**
     * This is the same lab exercise as 4.15 on Zybooks
     * @see {@linktourl https://learn.zybooks.com/zybook/UmmAl-QuraUniversityCS1211QadahWinter2023/chapter/4/section/15 }
     * 
     * Write a method drivingCost() with input parameters milesPerGallon, dollarsPerGallon, and milesDriven that returns the dollar cost to drive those miles. All items are of type double. The method called with arguments (20.0, 3.1599, 50.0) returns 7.89975.
     * Define that method in a program whose inputs are the car's miles per gallon and the price of gas in dollars per gallon (both doubles). 
     * Output the gas cost for 10 miles, 50 miles, and 400 miles, by calling your drivingCost() method three times.
     * Output each floating-point value with two digits after the decimal point, which can be achieved as follows:
     * System.out.printf("%.2f", yourValue);
     * 
     * NEVER XcQ
     * The output ends with a newline.
     * 
     * Ex: If the input is:
     * 20.0 3.1599
     * 
     * the output is:
     * 1.58 7.90 63.20
     * 
     * Your program must define and call a method:
     * public static double drivingCost(double milesPerGallon, double dollarsPerGallon, double milesDriven)
     *
     */

    /* Define the method `drivingCost` HERE */
    public static Double drivingCost(Double milesPerGallon, Double dollarsPerGallon, Double milesDriven) {
        return (milesDriven/milesPerGallon) * dollarsPerGallon;
    }

    public static void part2(){
        Scanner scnr = new Scanner(System.in);   

        /* Write your code here which calls drivingCost */
        System.out.println("Enter milesPerGallon: ");
        Double mpg = scnr.nextDouble();
        System.out.println("Enter dollarsPerGallon: ");
        Double dpg = scnr.nextDouble();
        System.out.printf("%.2f %.2f %.2f\n", drivingCost(mpg, dpg, 10.0), drivingCost(mpg, dpg, 50.0), drivingCost(mpg, dpg, 400.0));
    }

    /**
     * * This is the same lab exercise as 4.16 on Zybooks
     * @see {@linktourl https://learn.zybooks.com/zybook/UmmAl-QuraUniversityCS1211QadahWinter2023/chapter/4/section/16 }
     * 
     * Given three floating-point numbers x, y, and z, 
     * output x to the power of z, x to the power of (y to the power of z),
     * the absolute value of y, and the square root of (xy to the power of z).
     * 
     * Ex: If the input is:
     * 3.6 4.5 2.0
     * the output is:
     * 12.96 1.841304610218211E11 4.5 16.2
     */

    public static void part3(){
        Scanner scnr = new Scanner(System.in); 

        /* Write your code here */
        Double x, y, z;
        System.out.println("Enter a value (in order) for x, y, z");
        x = scnr.nextDouble();
        y = scnr.nextDouble();
        z = scnr.nextDouble();

        System.out.println("" + Math.pow(x, z) + " " + Math.pow(x, Math.pow(y, z)) + " " + Math.abs(y) + " " + Math.sqrt(Math.pow(x * y, z)));
    }

    /*
     * main()
     *
     * Program execution begins with this method.
     */
     
    public static void main(String [] cargs) {
        /** 
         * The following lines will run the code that you have implmented above
         * Currently, they are commented-out. You can uncomment to enble running
         * Each part individually as you code.
         */

        part1();
        part2();
        part3();
    }

}
