#include <stdio.h>
#include <string.h>

void vulnerable() {
    char buffer[10];
    printf("Enter some text: ");
    gets(buffer);           // <-- unsafe, có thể overflow 123123
    printf("You said: %s\n", buffer);
}

int main() {
    vulnerable();
    return 0;
}
