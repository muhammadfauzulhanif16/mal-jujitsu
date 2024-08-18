<?php
  
  namespace Database\Seeders;
  
  use App\Models\Criteria;
  use App\Models\SubCriteria;
  use App\Models\SubSubCriteria;
  use Illuminate\Database\Seeder;
  
  class CriteriaSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $criterias = [
        [
          'name' => 'Etika',
          'type' => 'radio',
          'sub-criterias' => [
            [
              'name' => 'Kedisiplinan',
              'sub-sub-criterias' => [
                [
                  'name' => 'Kehadiran selama pelatihan',
                  'description' => 'Pilih nilai 1-5',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Waktu kedatangan saat latihan',
                  'description' => 'Pilih nilai 1-5',
                  'type' => 'radio',
                ],
              ],
            ],
            [
              'name' => 'Perilaku',
              'sub-sub-criterias' => [
                [
                  'name' => 'Sikap ketika pelatih memberikan materi',
                  'description' => 'Pilih nilai 1-5',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Sikap ketika melakukan teknik/materi yang diperintahkan',
                  'description' => 'Pilih nilai 1-5',
                  'type' => 'radio',
                ],
              ],
            ],
          ],
        ],
        [
          'name' => 'Teknik Bertanding',
          'type' => 'radio',
          'sub-criterias' => [
            [
              'name' => 'Ne-Waza',
              'sub-sub-criterias' => [
                [
                  'name' => 'Takedown',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Passing guard',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Position control',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Sweep',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Submission',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Escape position/submission',
                  'type' => 'radio',
                ],
              ],
            ],
            [
              'name' => 'Fighting',
              'sub-sub-criterias' => [
                [
                  'name' => 'Pukulan',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Tendangan',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Tangkisan',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Footwork',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Takedown',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Passing guard',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Position control',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Sweep',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Submission',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Escape position/submission',
                  'type' => 'radio',
                ],
              ],
            ],
          ],
        ],
        [
          'name' => 'Fisik',
          'type' => 'text',
          'required' => false,
          'sub-criterias' => [
            [
              'name' => 'Power',
              'sub-sub-criterias' => [
                [
                  'name' => 'Standing board jump',
                  'description' => 'Jarak dalam satuan meter',
                  'type' => 'number',
                  'unit' => 'm',
                  'male_benchmark' => '> 3 m',
                  'female_benchmark' => '> 2.52 m',
                ],
                [
                  'name' => 'Vertical jump',
                  'description' => 'Jarak dalam satuan sentimeter',
                  'type' => 'number',
                  'unit' => 'cm',
                  'male_benchmark' => '> 70 cm',
                  'female_benchmark' => '> 50 cm',
                ],
              ],
            ],
            [
              'name' => 'Flexibility',
              'sub-sub-criterias' => [
                [
                  'name' => 'Sit and react test',
                  'description' => 'Jarak dalam satuan sentimeter',
                  'type' => 'number',
                  'unit' => 'cm',
                  'male_benchmark' => '27 cm',
                  'female_benchmark' => '27 cm',
                ],
                [
                  'name' => 'Split flex',
                  'description' => 'Jarak dalam satuan sentimeter',
                  'type' => 'number',
                  'unit' => 'cm',
                  'male_benchmark' => '100 cm',
                  'female_benchmark' => '100 cm',
                ],
              ],
            ],
            [
              'name' => 'Speed',
              'sub-sub-criterias' => [
                [
                  'name' => '20 meter speed test',
                  'description' => 'Jarak dalam satuan detik',
                  'type' => 'number',
                  'unit' => 's',
                  'male_benchmark' => '< 2.80 s',
                  'female_benchmark' => '< 3.00 s',
                ],
                [
                  'name' => '30 meter speed test',
                  'description' => 'Jarak dalam satuan detik',
                  'type' => 'number',
                  'unit' => 's',
                  'male_benchmark' => '< 4.3 s',
                  'female_benchmark' => '< 5.0 s',
                ],
              ],
            ],
            [
              'name' => 'Agility',
              'sub-sub-criterias' => [
                [
                  'name' => 'Shuttle run',
                  'description' => 'Waktu dalam satuan detik',
                  'type' => 'number',
                  'unit' => 's',
                  'male_benchmark' => '5 s',
                  'female_benchmark' => '6.3 s',
                ],
                [
                  'name' => '4 cone agility test',
                  'description' => 'Waktu dalam satuan detik',
                  'type' => 'number',
                  'unit' => 's',
                  'male_benchmark' => '3 s',
                  'female_benchmark' => '3.75 s',
                ],
              ],
            ],
            [
              'name' => 'Muscle Strenght',
              'sub-sub-criterias' => [
                [
                  'name' => 'Push up',
                  'description' => 'Hitung dalam satuan repetisi',
                  'type' => 'number',
                  'unit' => 'x',
                  'male_benchmark' => '> 60 x',
                  'female_benchmark' => '> 50 x',
                ],
                [
                  'name' => 'Sit up',
                  'description' => 'Hitung dalam satuan repetisi',
                  'type' => 'number',
                  'unit' => 'x',
                  'male_benchmark' => '105 x',
                  'female_benchmark' => '105 x',
                ],
                [
                  'name' => 'Wall sit',
                  'description' => 'Hitung dalam satuan detik',
                  'type' => 'number',
                  'unit' => 's',
                  'male_benchmark' => '> 120 s',
                  'female_benchmark' => '> 120 s',
                ],
                [
                  'name' => 'Bodyweight squad',
                  'description' => 'Hitung dalam satuan repetisi',
                  'type' => 'number',
                  'unit' => 'x',
                  'male_benchmark' => '> 96 x',
                  'female_benchmark' => '> 76 x',
                ],
                [
                  'name' => 'Core strength',
                  'description' => 'Hitung dalam satuan repetisi',
                  'type' => 'number',
                  'unit' => 'x',
                  'male_benchmark' => '12 x',
                  'female_benchmark' => '12 x',
                ],
              ],
            ],
            [
              'name' => 'VO2MAX',
              'sub-sub-criterias' => [
                [
                  'name' => 'Bleep test',
                  'description' => 'Isi dalam satuan ML/KG/MIN',
                  'type' => 'number',
                  'unit' => 'ML/KG/MIN',
                  'male_benchmark' => '> 60 ML/KG/MIN',
                  'female_benchmark' => '> 50 ML/KG/MIN',
                ],
                [
                  'name' => 'Cooper test',
                  'description' => 'Isi dalam satuan ML/KG/MIN',
                  'type' => 'number',
                  'unit' => 'ML/KG/MIN',
                  'male_benchmark' => '> 54 ML/KG/MIN',
                  'female_benchmark' => '> 44 ML/KG/MIN',
                ],
              ],
            ],
          ],
        ],
      ];
      
      foreach ($criterias as $criteria) {
        $criteriaModel = Criteria::create([
          'name' => $criteria['name'],
          'type' => $criteria['type'],
        ]);
        
        foreach ($criteria['sub-criterias'] as $subCriteria) {
          $subCriteriaData = ['name' => $subCriteria['name'], 'criteria_id' => $criteriaModel->id];
          $subCriteriaModel = SubCriteria::create($subCriteriaData);
          
          foreach ($subCriteria['sub-sub-criterias'] as $subSubCriteria) {
            $subSubCriteriaData = [
              'name' => $subSubCriteria['name'],
              'sub_criteria_id' => $subCriteriaModel->id,
              'description' => isset($subSubCriteria['description']) ? $subSubCriteria['description'] : '',
              'type' => $subSubCriteria['type'],
              'required' => isset($criteria['required']) ? $criteria['required'] : true,
              'unit' => isset($subSubCriteria['unit']) ? $subSubCriteria['unit'] : '',
              'male_benchmark' => isset($subSubCriteria['male_benchmark']) ? $subSubCriteria['male_benchmark'] : '',
              'female_benchmark' => isset($subSubCriteria['female_benchmark']) ? $subSubCriteria['female_benchmark'] : '',
            ];
            SubSubCriteria::create($subSubCriteriaData);
          }
        }
      }
    }
  }
