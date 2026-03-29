using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;

namespace asztali
{
    public partial class DatabaseForm : Form
    {
        string cs = "server=localhost;uid=root;database=mozi_adat;port=3306;pwd=;";
        public DatabaseForm()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            using (MySqlConnection conn = new MySqlConnection(cs))
            {
                conn.Open();

                string sql = "SELECT * FROM users";
                MySqlCommand cmd = new MySqlCommand(sql, conn);

                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    listBox1.Items.Clear();

                    while (reader.Read())
                    {
                        listBox1.Items.Add(reader["full_name"].ToString() + ";" + reader["phone_number"].ToString() + ";" + reader["email"].ToString());
                    }
                }
            }
        }

        private void LoadList()
        {
            try
            {
                listBox1.Items.Clear();

                using (MySqlConnection conn = new MySqlConnection(cs))
                {
                    conn.Open();

                    string sql = "SELECT * FROM users";
                    MySqlCommand cmd = new MySqlCommand(sql, conn);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        listBox1.Items.Clear();

                        while (reader.Read())
                        {
                            listBox1.Items.Add(reader["full_name"].ToString() + ";" + reader["phone_number"].ToString() + ";" + reader["email"].ToString());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString(), "LoadList hiba");
            }
        }


        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void Update_Click(object sender, EventArgs e)
        {
            if (listBox1.SelectedItem == null)
            {
                MessageBox.Show("Válassz ki egy elemet!");
                return;
            }

            string[] parts = listBox1.SelectedItem.ToString().Split(';');
            string oldName = parts[0].Trim();
            string oldPhone = parts.Length > 1 ? parts[1].Trim() : "";
            string oldEmail = parts.Length > 2 ? parts[2].Trim() : "";

            // Új értékek (alapból marad a régi)
            string newName = oldName;
            string newPhone = oldPhone;
            string newEmail = oldEmail;

            // 1) Név
            var ansName = MessageBox.Show("A nevét kívánja módosítani?", "Update", MessageBoxButtons.YesNo);
            if (ansName == DialogResult.Yes)
            {
                string input = Microsoft.VisualBasic.Interaction.InputBox("Új név:", "Név módosítása", oldName);
                if (!string.IsNullOrWhiteSpace(input)) newName = input.Trim();
            }

            // 2) Telefon
            var ansPhone = MessageBox.Show("A telefonszámát kívánja módosítani?", "Update", MessageBoxButtons.YesNo);
            if (ansPhone == DialogResult.Yes)
            {
                string input = Microsoft.VisualBasic.Interaction.InputBox("Új telefonszám:", "Telefon módosítása", oldPhone);
                if (!string.IsNullOrWhiteSpace(input)) newPhone = input.Trim();
            }

            // 3) Email
            var ansEmail = MessageBox.Show("Az email címét kívánja módosítani?", "Update", MessageBoxButtons.YesNo);
            if (ansEmail == DialogResult.Yes)
            {
                string input = Microsoft.VisualBasic.Interaction.InputBox("Új email:", "Email módosítása", oldEmail);
                if (!string.IsNullOrWhiteSpace(input)) newEmail = input.Trim();
            }

            // Ha semmit nem változtatott
            if (newName == oldName && newPhone == oldPhone && newEmail == oldEmail)
            {
                MessageBox.Show("Nem történt módosítás.");
                return;
            }

            try
            {
                using (var conn = new MySqlConnection(cs))
                {
                    conn.Open();

                    // Frissítés: beállítjuk az új értékeket
                    // Azonosítás: az eredeti adatok alapján (amíg nincs ID)
                    using (var cmd = new MySqlCommand(
                        @"UPDATE users
                  SET full_name=@newName, phone_number=@newPhone, email=@newEmail
                  WHERE full_name=@oldName AND phone_number=@oldPhone AND email=@oldEmail",
                        conn))
                    {
                        cmd.Parameters.AddWithValue("@newName", newName);
                        cmd.Parameters.AddWithValue("@newPhone", newPhone);
                        cmd.Parameters.AddWithValue("@newEmail", newEmail);

                        cmd.Parameters.AddWithValue("@oldName", oldName);
                        cmd.Parameters.AddWithValue("@oldPhone", oldPhone);
                        cmd.Parameters.AddWithValue("@oldEmail", oldEmail);

                        int rows = cmd.ExecuteNonQuery();
                        MessageBox.Show($"Módosított sorok: {rows}");
                    }
                }


                LoadList(); // ezután jön a gond nálad -> ott lesz a hiba
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString(), "Update hiba");

            }
        }

        private void Insert_Click(object sender, EventArgs e)
        {
            string name = Microsoft.VisualBasic.Interaction.InputBox("Név:");
            string phone = Microsoft.VisualBasic.Interaction.InputBox("Telefon:");
            string email = Microsoft.VisualBasic.Interaction.InputBox("Email:");

            using (var conn = new MySqlConnection(cs))
            {
                conn.Open();

                var cmd = new MySqlCommand(
                    "INSERT INTO users(full_name, phone_number, email) VALUES(@n,@p,@e)", conn);

                cmd.Parameters.AddWithValue("@n", name);
                cmd.Parameters.AddWithValue("@p", phone);
                cmd.Parameters.AddWithValue("@e", email);


                cmd.ExecuteNonQuery();
            }

            LoadList();
        }

        private void Delete_Click(object sender, EventArgs e)
        {
            if (listBox1.SelectedItem == null)
            {
                MessageBox.Show("Nincs kiválasztva elem!");
                return;
            }

            var selected = listBox1.SelectedItem.ToString().Split(';')[0].Trim();

            var ok = MessageBox.Show("Biztos törlöd?", "Delete", MessageBoxButtons.YesNo);
            if (ok != DialogResult.Yes) return;

            using (var conn = new MySqlConnection(cs))
            {
                conn.Open();

                using (var cmd = new MySqlCommand("DELETE FROM users WHERE full_name = @t", conn))
                {
                    cmd.Parameters.AddWithValue("@t", selected);

                    int rows = cmd.ExecuteNonQuery();
                    MessageBox.Show($"Törölt sorok száma: {rows}");
                }
            }

            LoadList();
        }

        private void BacktoMain_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
