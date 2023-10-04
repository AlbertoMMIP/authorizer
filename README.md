# Discussing regarding the technical and archtectural decisions.
  - For the sake of simplicity I have decided make a little project in javascript.
  - The project reads a file with the operations to be analyzed.
  - In order to read the file, the path where it is saved must be sent as a parameter.
  - The output will be show in the same terminal from is executed the project.

# Reasoning about the frameworks used (if any framework/library was used).
  - The project has made with node js v12.6.1
  - To try following all your rules I decided not use any framework and work only with the properties that node provides us

# Instructions on how to compile and run the project.
  - First you can open a terminal and go to root of the project
  - Once you are inside of the directory, you only have to run de file js located in src/index.js with node command. You must put the path where is the file operations as parameter
  - Example: node src/index.js /Users/myUser/Authorizer/src/resources/input/operations

# Test
  - To test all cases in the spec.pdf file, I implemented a custom test 
  - To run this custom test you only have execute the following command (without parameter)
    - node src/index.js
  - You will see in the terminal the inputs and outputs of the different cases

# Additional notes you consider important to be evaluated.
  - To run the project you have to be installed node in your machine.
  - To see the outputs it's necessary to run the project from a terminal in whatever operating system. The terminal of VSCode is fine too.