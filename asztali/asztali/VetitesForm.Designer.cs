namespace asztali
{
    partial class VetitesForm
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
            groupBox1 = new GroupBox();
            listBoxVetitesek = new ListBox();
            groupBox2 = new GroupBox();
            tableLayoutPanel1 = new TableLayoutPanel();
            label1 = new Label();
            label2 = new Label();
            label3 = new Label();
            label4 = new Label();
            label5 = new Label();
            comboBox1 = new ComboBox();
            comboBox2 = new ComboBox();
            dateTimePicker1 = new DateTimePicker();
            dateTimePicker2 = new DateTimePicker();
            textBox1 = new TextBox();
            button1 = new Button();
            button2 = new Button();
            groupBox1.SuspendLayout();
            tableLayoutPanel1.SuspendLayout();
            SuspendLayout();
            // 
            // groupBox1
            // 
            groupBox1.Controls.Add(listBoxVetitesek);
            groupBox1.Location = new Point(3, 3);
            groupBox1.Name = "groupBox1";
            groupBox1.Size = new Size(168, 199);
            groupBox1.TabIndex = 0;
            groupBox1.TabStop = false;
            groupBox1.Text = "Vetítések";
            // 
            // listBoxVetitesek
            // 
            listBoxVetitesek.FormattingEnabled = true;
            listBoxVetitesek.ItemHeight = 15;
            listBoxVetitesek.Location = new Point(7, 37);
            listBoxVetitesek.Name = "listBoxVetitesek";
            listBoxVetitesek.Size = new Size(155, 139);
            listBoxVetitesek.TabIndex = 0;
            // 
            // groupBox2
            // 
            groupBox2.Location = new Point(612, 27);
            groupBox2.Name = "groupBox2";
            groupBox2.Size = new Size(155, 175);
            groupBox2.TabIndex = 1;
            groupBox2.TabStop = false;
            groupBox2.Text = "Vetítés Adatai";
            // 
            // tableLayoutPanel1
            // 
            tableLayoutPanel1.ColumnCount = 2;
            tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));
            tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));
            tableLayoutPanel1.Controls.Add(groupBox1, 0, 0);
            tableLayoutPanel1.Controls.Add(label1, 0, 1);
            tableLayoutPanel1.Controls.Add(label2, 0, 2);
            tableLayoutPanel1.Controls.Add(label3, 0, 3);
            tableLayoutPanel1.Controls.Add(label4, 0, 4);
            tableLayoutPanel1.Controls.Add(label5, 0, 5);
            tableLayoutPanel1.Controls.Add(comboBox1, 1, 1);
            tableLayoutPanel1.Controls.Add(comboBox2, 1, 2);
            tableLayoutPanel1.Controls.Add(dateTimePicker1, 1, 3);
            tableLayoutPanel1.Controls.Add(dateTimePicker2, 1, 4);
            tableLayoutPanel1.Controls.Add(textBox1, 1, 5);
            tableLayoutPanel1.Controls.Add(button1, 0, 6);
            tableLayoutPanel1.Controls.Add(button2, 1, 6);
            tableLayoutPanel1.Dock = DockStyle.Fill;
            tableLayoutPanel1.Location = new Point(0, 0);
            tableLayoutPanel1.Name = "tableLayoutPanel1";
            tableLayoutPanel1.RowCount = 7;
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Percent, 79.86577F));
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Percent, 20.1342278F));
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Absolute, 41F));
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Absolute, 42F));
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Absolute, 34F));
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Absolute, 33F));
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Absolute, 64F));
            tableLayoutPanel1.Size = new Size(825, 476);
            tableLayoutPanel1.TabIndex = 2;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(3, 209);
            label1.Name = "label1";
            label1.Size = new Size(33, 15);
            label1.TabIndex = 1;
            label1.Text = "Film:";
            label1.TextAlign = ContentAlignment.MiddleRight;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(3, 261);
            label2.Name = "label2";
            label2.Size = new Size(42, 15);
            label2.TabIndex = 2;
            label2.Text = "Terem:";
            label2.TextAlign = ContentAlignment.MiddleRight;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(3, 302);
            label3.Name = "label3";
            label3.Size = new Size(46, 15);
            label3.TabIndex = 3;
            label3.Text = "Kezdés:";
            label3.TextAlign = ContentAlignment.MiddleRight;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(3, 344);
            label4.Name = "label4";
            label4.Size = new Size(58, 15);
            label4.TabIndex = 4;
            label4.Text = "Befejezés:";
            label4.TextAlign = ContentAlignment.MiddleRight;
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(3, 378);
            label5.Name = "label5";
            label5.Size = new Size(22, 15);
            label5.TabIndex = 5;
            label5.Text = "Ár:";
            label5.TextAlign = ContentAlignment.MiddleRight;
            // 
            // comboBox1
            // 
            comboBox1.Anchor = AnchorStyles.Left | AnchorStyles.Right;
            comboBox1.FormattingEnabled = true;
            comboBox1.Location = new Point(417, 222);
            comboBox1.Margin = new Padding(5);
            comboBox1.Name = "comboBox1";
            comboBox1.Size = new Size(403, 23);
            comboBox1.TabIndex = 6;
            // 
            // comboBox2
            // 
            comboBox2.Anchor = AnchorStyles.Left | AnchorStyles.Right;
            comboBox2.FormattingEnabled = true;
            comboBox2.Location = new Point(417, 269);
            comboBox2.Margin = new Padding(5);
            comboBox2.Name = "comboBox2";
            comboBox2.Size = new Size(403, 23);
            comboBox2.TabIndex = 7;
            // 
            // dateTimePicker1
            // 
            dateTimePicker1.Anchor = AnchorStyles.Left | AnchorStyles.Right;
            dateTimePicker1.Location = new Point(417, 307);
            dateTimePicker1.Margin = new Padding(5);
            dateTimePicker1.Name = "dateTimePicker1";
            dateTimePicker1.Size = new Size(403, 23);
            dateTimePicker1.TabIndex = 8;
            // 
            // dateTimePicker2
            // 
            dateTimePicker2.Anchor = AnchorStyles.Left | AnchorStyles.Right;
            dateTimePicker2.Location = new Point(417, 350);
            dateTimePicker2.Margin = new Padding(5);
            dateTimePicker2.Name = "dateTimePicker2";
            dateTimePicker2.Size = new Size(403, 23);
            dateTimePicker2.TabIndex = 9;
            // 
            // textBox1
            // 
            textBox1.Anchor = AnchorStyles.Left | AnchorStyles.Right;
            textBox1.Location = new Point(417, 383);
            textBox1.Margin = new Padding(5);
            textBox1.Name = "textBox1";
            textBox1.Size = new Size(403, 23);
            textBox1.TabIndex = 10;
            textBox1.TextAlign = HorizontalAlignment.Right;
            // 
            // button1
            // 
            button1.Location = new Point(3, 414);
            button1.Name = "button1";
            button1.Size = new Size(85, 32);
            button1.TabIndex = 11;
            button1.Text = "button1";
            button1.UseVisualStyleBackColor = true;
            // 
            // button2
            // 
            button2.Location = new Point(415, 414);
            button2.Name = "button2";
            button2.Size = new Size(121, 32);
            button2.TabIndex = 12;
            button2.Text = "button2";
            button2.UseVisualStyleBackColor = true;
            // 
            // VetitesForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(825, 476);
            Controls.Add(groupBox2);
            Controls.Add(tableLayoutPanel1);
            Name = "VetitesForm";
            Text = "VetitesForm";
            groupBox1.ResumeLayout(false);
            tableLayoutPanel1.ResumeLayout(false);
            tableLayoutPanel1.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private GroupBox groupBox1;
        private ListBox listBoxVetitesek;
        private GroupBox groupBox2;
        private TableLayoutPanel tableLayoutPanel1;
        private Label label1;
        private Label label2;
        private Label label3;
        private Label label4;
        private Label label5;
        private ComboBox comboBox1;
        private ComboBox comboBox2;
        private DateTimePicker dateTimePicker1;
        private DateTimePicker dateTimePicker2;
        private TextBox textBox1;
        private Button button1;
        private Button button2;
    }
}