const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const caName = document.getElementById("caName").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const purpose = document.getElementById("purpose").value.trim();

    if (!name || !email || !phone || !caName || !date || !time || !purpose) {
        alert("All fields are compulsory.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (selectedDateTime <= now) {
        alert("Appointment must be scheduled for a future date and time.");
        return;
    }

    const appointment = { name, email, phone, caName, date, time, purpose };

    const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
    });

    const result = await response.json();

    if (!response.ok) {
        alert(result.message);
        return;
    }

    alert("Appointment booked successfully!");
    form.reset();
    loadAppointments();
});

// DELETE
async function deleteAppointment(id) {
    await fetch(`/api/appointments/${id}`, {
        method: "DELETE"
    });
}

// LOAD
async function loadAppointments() {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    document.getElementById("ca1Appointments").innerHTML = "";
    document.getElementById("ca2Appointments").innerHTML = "";
    document.getElementById("ca3Appointments").innerHTML = "";

    let count1 = 0, count2 = 0, count3 = 0;

    const now = new Date();

    data.forEach(app => {

        const appointmentDateTime = new Date(`${app.date}T${app.time}`);

        const dateObj = new Date(app.date);
        const formattedDate = dateObj.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        });

        const timeObj = new Date(`1970-01-01T${app.time}`);
        const formattedTime = timeObj.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

        const div = document.createElement("div");
        div.classList.add("appointment-item");

        // FUTURE → CANCEL
        if (appointmentDateTime > now) {
            div.innerHTML = `
                <strong>${app.name}</strong><br>
                Date: ${formattedDate}<br>
                Time: ${formattedTime}<br>
                <button onclick="cancelAppointment('${app._id}')">Cancel</button>
            `;
        } 
        // PAST → MEETING DONE
        else {
            div.innerHTML = `
                <strong>${app.name}</strong><br>
                Date: ${formattedDate}<br>
                Time: ${formattedTime}<br>
                <button onclick="completeAppointment('${app._id}', '${app.caName}')">Meeting Done</button>
            `;
        }

        if (app.caName === "CA Rajesh Sharma") {
            document.getElementById("ca1Appointments").appendChild(div);
        }
        else if (app.caName === "CA Priya Mehta") {
            document.getElementById("ca2Appointments").appendChild(div);
        }
        else if (app.caName === "CA Amit Verma") {
            document.getElementById("ca3Appointments").appendChild(div);
        }
    });

    // Update counts
    document.getElementById("count1").innerText = localStorage.getItem("count1") || 0;
    document.getElementById("count2").innerText = localStorage.getItem("count2") || 0;
    document.getElementById("count3").innerText = localStorage.getItem("count3") || 0;
}

// CANCEL
async function cancelAppointment(id) {
    await deleteAppointment(id);
    loadAppointments();
}

// MEETING DONE
async function completeAppointment(id, caName) {

    if (caName === "CA Rajesh Sharma") {
        let c = parseInt(localStorage.getItem("count1") || 0);
        localStorage.setItem("count1", ++c);
    }
    else if (caName === "CA Priya Mehta") {
        let c = parseInt(localStorage.getItem("count2") || 0);
        localStorage.setItem("count2", ++c);
    }
    else if (caName === "CA Amit Verma") {
        let c = parseInt(localStorage.getItem("count3") || 0);
        localStorage.setItem("count3", ++c);
    }

    await deleteAppointment(id);
    loadAppointments();
}

loadAppointments();