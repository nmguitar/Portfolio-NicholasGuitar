#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

#random number between 1-1000 generated as correct number variable
CORRECT_NUMBER=$((1 + $RANDOM % 1000))
#echo $CORRECT_NUMBER
echo -e "Enter your username:"
read USERNAME

USERNAME_CHECK=$($PSQL "SELECT username FROM user_info WHERE username='$USERNAME'")

#if statement checking if provided username exists in database
if [[ -z "$USERNAME_CHECK" ]]
then
  #also insert new row for new username and add 1 game played
  INSERT_NEW_USERNAME=$($PSQL "INSERT INTO user_info(username) VALUES('$USERNAME')") 
  #BEST_GAME=$($PSQL "SELECT best_game FROM user_info WHERE username='$USERNAME'")
  #GAMES_PLAYED=$($PSQL "SELECT games_played FROM user_info WHERE username='$USERNAME'")
  #if username hasn't been used before, echo required sentence and
  echo -e "Welcome, $USERNAME! It looks like this is your first time here."
else
  #if it has been used before, pull in best game number and games played count and echo
  #correct message
  BEST_GAME=$($PSQL "SELECT best_game FROM user_info WHERE username='$USERNAME'")
  GAMES_PLAYED=$($PSQL "SELECT games_played FROM user_info WHERE username='$USERNAME'")
  echo -e "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

echo -e "Guess the secret number between 1 and 1000:"
GUESS_COUNT=0

GUESSING_GAME() {
  read CURRENT_GUESS
  GUESS_COUNT=$((1 + $GUESS_COUNT))
  #if statement checking if provided guess is an integer
  if [[ $CURRENT_GUESS =~ ^[0-9]+$ ]]
  then
    #if it is an integer, new if statement checking if guess matches the correct number
    if [[ $CURRENT_GUESS =~ $CORRECT_NUMBER ]]
    then
      #update the games played count
      INC_GAMES_PLAYED=$($PSQL "UPDATE user_info SET games_played=$GAMES_PLAYED+1 WHERE username='$USERNAME'")
      #echo -e "BTW $BEST_GAME was your best game"
      #confirm best game exists
      if [[ -z $BEST_GAME ]]
      then
        #echo -e "Yay new best game of: $GUESS_COUNT"
        UPDATE_BEST_GAME=$($PSQL "UPDATE user_info SET best_game=$GUESS_COUNT WHERE username='$USERNAME'")
        UPDATE_GAMES_PLAYED=$($PSQL "UPDATE user_info SET games_played=1 WHERE username='$USERNAME'")
        echo -e "You guessed it in $GUESS_COUNT tries. The secret number was $CORRECT_NUMBER. Nice job!"
      else
        #check if guess count is less than best game
        #echo -e "Your best game was $BEST_GAME and guess count was $GUESS_COUNT"
        if [[ $GUESS_COUNT -lt $BEST_GAME ]]
        then
          #echo -e "High score went from $BEST_GAME to $GUESS_COUNT"
          UPDATE_BEST_GAME=$($PSQL "UPDATE user_info SET best_game=$GUESS_COUNT WHERE username='$USERNAME'")
          
        fi
        
        #if guessed correctly, print congratulatory message
        echo -e "You guessed it in $GUESS_COUNT tries. The secret number was $CORRECT_NUMBER. Nice job!"
      fi
      
    else
      #if not guessed correctly, if statement checking if guess is greater than correct number
      if [[ $CURRENT_GUESS -gt $CORRECT_NUMBER ]]
      then
        #if guess reater than correct num, display the message, request new guess, and recall guessing game function
        echo -e "It's lower than that, guess again:"
        GUESSING_GAME
      else
        #if guess less than correct num, display the message, request new guess, and recall guessing game function
        echo -e "It's higher than that, guess again:"
        GUESSING_GAME
      fi
          
    fi
  else
    #if not an integer request another guess
    echo -e "That is not an integer, guess again:"
    GUESSING_GAME
  fi
}

GUESSING_GAME
    
