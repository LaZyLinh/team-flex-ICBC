# Bloc naming conventions

## Event
- Past tense verbs because past event from point of view of bloc
- Subject + optional noun + past tensed verb
- Initial load event should be Subject + Started

## State
- Noun because === snapshot
- Subject + Action + :
    - Initial, Success, Failure, InProgress

# Usage

## Bloc superclass
- There is a getter for current state: state

## Raise event
- BlocProvider.of< UserBloc >(context)
            .add(UserEmailAddressEntered(_email.text));