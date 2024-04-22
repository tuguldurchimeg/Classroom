.model small
.stack 100h

.data
   msg  db 13, 10, "hello"

.code
main proc
        mov ax, @data
main endp
end main