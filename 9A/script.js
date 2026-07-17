// ===========================================
// Student Data
// ===========================================

const students = [
    { roll: 1, name: "Aadarsh Singh", gender: "Boy"  },
    { roll: 2, name: "Aayush Kumar Shaw", gender: "Boy"  },
    { roll: 3, name: "Abdul Asif", gender: "Boy"  },
    { roll: 4, name: "Aditya Aryan", gender: "Boy"  },
    { roll: 5, name: "Aditya Raj", gender: "Boy"  },
    { roll: 6, name: "Ananta Majee", gender: "Boy"  },
    { roll: 7, name: "Aniket Pandey", gender: "Boy"  },
    { roll: 8, name: "Annalaxmi Routh", gender: "Girl" },
    { roll: 9, name: "Annesha Mahato", gender: "Girl" },
    { roll: 10, name: "Anshuman Maiti", gender: "Boy"  },
    { roll: 11, name: "Anwesha Dey", gender: "Girl" },
    { roll: 12, name: "Arnab Kumar Mandal", gender: "Boy"  },
    { roll: 13, name: "Ayush Kumar Rabidas", gender: "Boy"  },
    { roll: 14, name: "Bedantika Bauri", gender: "Girl" },
    { roll: 15, name: "Bhaskar Sarkar", gender: "Boy"  },
    { roll: 16, name: "Bhaswati Sarkar", gender: "Girl" },
    { roll: 17, name: "Bishes Bauri", gender: "Boy"  },
    { roll: 18, name: "Dibya Rajak", gender: "Girl" },
    { roll: 19, name: "Dipanwita Murmu", gender: "Girl" },
    { roll: 20, name: "Farha Parween", gender: "Girl" },
    { roll: 21, name: "Guruvelli Likhitha", gender: "Girl" },
    { roll: 22, name: "Inaya Hassan", gender: "Girl" },
    { roll: 23, name: "J. Jeet Rao", gender: "Boy" },
    { roll: 24, name: "Madhumita Chakrabortty", gender: "Girl" },
    { roll: 25, name: "Mohit Bouri", gender: "Boy" },
    { roll: 26, name: "Nandamuri Mohit Kumar", gender: "Boy" },
    { roll: 27, name: "Oishee Chakrabarti", gender: "Girl" },
    { roll: 28, name: "Pousam Karmakar", gender: "Boy" },
    { roll: 29, name: "Priya Bharti", gender: "Girl" },
    { roll: 30, name: "Mohammad Rayyan Ali", gender: "Boy" },
    { roll: 31, name: "Riya Bauri", gender: "Girl" },
    { roll: 32, name: "Shakshi Kumari", gender: "Girl" },
    { roll: 33, name: "Shanell McNair Singh", gender: "Girl" },
    { roll: 34, name: "Shibam Gorain", gender: "Boy" },
    { roll: 35, name: "Shivam Bauri", gender: "Boy" },
    { roll: 36, name: "Md. Soheb", gender: "Boy" },
    { roll: 37, name: "Sijan Bauri", gender: "Boy" },
    { roll: 38, name: "Sonakshi", gender: "Girl" },
    { roll: 39, name: "Soumya Tripathi", gender: "Girl" },
    { roll: 40, name: "Sritam Mahato", gender: "Boy" },
    { roll: 41, name: "Subham Chandra", gender: "Boy" },
    { roll: 42, name: "Tanvir Iqbal", gender: "Boy" },
    { roll: 43, name: "Tushar Kanti Garain", gender: "Boy" },
    { roll: 44, name: "Visesh Rajak", gender: "Boy" }
];

const absentStudents = new Set();

const dateTime = document.getElementById("dateTime");

function updateDateTime(){

    const now = new Date();

    const options = {

        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"

    };

    const date =
        now.toLocaleDateString("en-IN",options);

    const time =
        now.toLocaleTimeString("en-IN");

    dateTime.innerHTML =
        `📅 ${date} | 🕒 ${time}`;

}

updateDateTime();

setInterval(updateDateTime,1000);

const toast =
document.getElementById("toast");

function showToast(message){

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// ===========================================
// DOM Elements
// ===========================================

const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");

const totalStudents = document.getElementById("totalStudents");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");
const boysPresent = document.getElementById("boysPresent");
const girlsPresent = document.getElementById("girlsPresent");

const resultBox = document.getElementById("resultBox");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const selectAllBtn = document.getElementById("selectAllBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

// ===========================================
// Display Students
// ===========================================

function displayStudents(studentArray){

    studentList.innerHTML = "";

    studentArray.forEach(student => {

        const item = document.createElement("div");
        item.className = "student-item";

        if (absentStudents.has(student.roll)) {
            item.classList.add("absent");
}

        item.innerHTML = `
            <input
                type="checkbox"
                id="student${student.roll}"
                class="studentCheckbox"
                data-roll="${student.roll}"
                ${absentStudents.has(student.roll) ? "checked" : ""}
            />

            <label for="student${student.roll}">
                ${student.roll}. ${student.name}
            </label>
        `;

        studentList.appendChild(item);

    });

    updateCounts();

}

displayStudents(students);

// ===========================================
// Update Present / Absent Counts
// ===========================================

function updateCounts() {

    const total = students.length;
    const absent = absentStudents.size;
    const present = total - absent;

    const boysPresentCount = students.filter(student =>
        student.gender === "Boy" &&
        !absentStudents.has(student.roll)
    ).length;

    const girlsPresentCount = students.filter(student =>
        student.gender === "Girl" &&
        !absentStudents.has(student.roll)
    ).length;

    totalStudents.textContent = total;
    presentCount.textContent = present;
    absentCount.textContent = absent;

    boysPresent.textContent = boysPresentCount;
    girlsPresent.textContent = girlsPresentCount;
}

function setAbsent(roll, isAbsent) {

    // Find the student row
    const checkbox = document.querySelector(
        `.studentCheckbox[data-roll="${roll}"]`
    );

    const studentItem = checkbox?.closest(".student-item");

    if (isAbsent) {
        absentStudents.add(roll);

        if (checkbox)
            checkbox.checked = true;

        if (studentItem)
            studentItem.classList.add("absent");
    }
    else {

        absentStudents.delete(roll);

        if (checkbox)
            checkbox.checked = false;

        if (studentItem)
            studentItem.classList.remove("absent");
    }

    updateCounts();
}

document.addEventListener("change", function (e) {

    if (!e.target.classList.contains("studentCheckbox")) return;

    const roll = Number(e.target.dataset.roll);

    setAbsent(roll, e.target.checked);

});

// ===========================================
// Search Student
// ===========================================

searchInput.addEventListener("input",function(){

    const keyword = this.value.toLowerCase();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(keyword) ||
        student.roll.toString().includes(keyword)

    );

    displayStudents(filtered);

});

const absentList =
students.filter(student =>
    absentStudents.has(student.roll)
);

// ===========================================
// Generate Absentee List
// ===========================================

generateBtn.addEventListener("click",function(){

    const checkboxes =
        document.querySelectorAll(".studentCheckbox");

    const today = new Date();

    const date =
        String(today.getDate()).padStart(2,'0') + "/" +
        String(today.getMonth()+1).padStart(2,'0') + "/" +
        today.getFullYear();

    let output =
`9A Today's Absentees 
(${date})

`;

    let count = 1;

    checkboxes.forEach((checkbox,index)=>{

        if(checkbox.checked){

            output += `${count}. ${students[index].name}\n`;
            count++;

        }

    });

    if(count===1){

        output += "No student is absent today.";

    }

    resultBox.value = output;

});

// ===========================================
// Copy Button
// ===========================================

copyBtn.addEventListener("click",function(){

    if(resultBox.value===""){
        alert("Generate the list first.");
        return;
    }

    navigator.clipboard.writeText(resultBox.value);

    copyBtn.textContent = "Copied ✓";

    showToast("✅ Attendance copied successfully!");

    setTimeout(function(){

        copyBtn.textContent = "Copy";

    },2000);

});

// ===========================================
// Select All
// ===========================================

selectAllBtn.addEventListener("click", function () {

    students.forEach(student => {

        setAbsent(student.roll, true);

    });

});

// ===========================================
// Clear All
// ===========================================

clearAllBtn.addEventListener("click", function () {

    students.forEach(student => {

        setAbsent(student.roll, false);

    });

});