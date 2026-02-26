paypal.Buttons({
    createOrder: () => {
        return fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                produkte: AusgewählteProdukteArrayPreis.map(p =>
    parseFloat(p)
    )

            })
        })
        .then(res => res.json())
        .then(data => data.id);
    },

    onApprove: (data) => {
        return fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderID: data.orderID,
                produkte: AusgewählteProdukteArrayPreis,
                Produkte: AusgewählteProdukteArray,
                KonfigurationenArray: KonfigurationenArray
            })
        })
        .then(() => alert("Zahlung erfolgreich ✅"));
    }
}).render("#paypal-button");

