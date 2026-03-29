namespace asztali
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            btnLoadFilmek = new Button();
            label1 = new Label();
            btnBack = new Button();
            Adatbázis = new Button();
            listBoxFilmek = new ListBox();
            btnFilmEditor = new Button();
            SuspendLayout();
            // 
            // btnLoadFilmek
            // 
            btnLoadFilmek.Location = new Point(485, 27);
            btnLoadFilmek.Margin = new Padding(3, 4, 3, 4);
            btnLoadFilmek.Name = "btnLoadFilmek";
            btnLoadFilmek.Size = new Size(206, 196);
            btnLoadFilmek.TabIndex = 1;
            btnLoadFilmek.Text = "Filmek betöltése";
            btnLoadFilmek.UseVisualStyleBackColor = true;
            btnLoadFilmek.Click += btnLoadFilmek_Click_1;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(471, 515);
            label1.Name = "label1";
            label1.Size = new Size(76, 20);
            label1.TabIndex = 2;
            label1.Text = "MainForm";
            // 
            // btnBack
            // 
            btnBack.Location = new Point(45, 375);
            btnBack.Margin = new Padding(3, 4, 3, 4);
            btnBack.Name = "btnBack";
            btnBack.Size = new Size(237, 163);
            btnBack.TabIndex = 3;
            btnBack.Text = "Bejelentkezés";
            btnBack.UseVisualStyleBackColor = true;
            btnBack.Click += btnBack_Click;
            // 
            // Adatbázis
            // 
            Adatbázis.Location = new Point(713, 380);
            Adatbázis.Margin = new Padding(3, 4, 3, 4);
            Adatbázis.Name = "Adatbázis";
            Adatbázis.Size = new Size(163, 157);
            Adatbázis.TabIndex = 4;
            Adatbázis.Text = "Adatbázis";
            Adatbázis.UseVisualStyleBackColor = true;
            Adatbázis.Click += button1_Click;
            // 
            // listBoxFilmek
            // 
            listBoxFilmek.FormattingEnabled = true;
            listBoxFilmek.Location = new Point(14, 27);
            listBoxFilmek.Margin = new Padding(3, 4, 3, 4);
            listBoxFilmek.Name = "listBoxFilmek";
            listBoxFilmek.Size = new Size(463, 324);
            listBoxFilmek.TabIndex = 5;
            // 
            // btnFilmEditor
            // 
            btnFilmEditor.Location = new Point(749, 36);
            btnFilmEditor.Name = "btnFilmEditor";
            btnFilmEditor.Size = new Size(126, 122);
            btnFilmEditor.TabIndex = 6;
            btnFilmEditor.Text = "Filmek kezelése";
            btnFilmEditor.UseVisualStyleBackColor = true;
            btnFilmEditor.Click += btnFilmEditor_Click;
            // 
            // MainForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(914, 600);
            Controls.Add(btnFilmEditor);
            Controls.Add(listBoxFilmek);
            Controls.Add(Adatbázis);
            Controls.Add(btnBack);
            Controls.Add(label1);
            Controls.Add(btnLoadFilmek);
            Margin = new Padding(3, 4, 3, 4);
            Name = "MainForm";
            Text = "Main Form";
            Load += MainForm_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private Button btnLoadFilmek;
        private Label label1;
        private Button btnBack;
        private Button Adatbázis;
        private ListBox listBoxFilmek;
        private Button btnFilmEditor;
    }
}