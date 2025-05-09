#include <iostream>
#include <cstring>

void useAfterFree() {
    char *data = new char[20];
    strcpy(data, "Hello, Joern!");
    delete[] data;          // giải phóng
    std::cout << data;      // <-- use-after-free
}

int main() {
    useAfterFree();
    return 0;
}
