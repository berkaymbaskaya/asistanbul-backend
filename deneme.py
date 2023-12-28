import sys

def main():
    # Komut satırından gelen argümanları alıyoruz
    args = sys.argv[1:]  # İlk argüman scriptin adı olduğu için onu almıyoruz

    if len(args) < 1:
        print("Lütfen en az bir parametre girin.")
        return

    # Gelen parametreleri kullanarak işlem yapabilirsiniz, örnek olarak sadece parametreleri yazdıralım
    for arg in args:
        print(f"Gelen parametre: {arg}")

if __name__ == "__main__":
    main()
